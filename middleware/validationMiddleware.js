import { body, param, validationResult } from "express-validator";
import mongoose, { Mongoose } from "mongoose";
import {
    Application_status,
    Employment_Type,
    Seniority_Level,
    Work_Mode,
    Candidate_Quota,
    user_Role,
    User_Gender,
    User_Status,
} from "../utils/constants.js";
import User from '../models/userModel.js'
import Job from '../models/jobModel.js'


// A function which will checks the errors thats means we dont have to write the errors multiple times we can only write once and changes the arguent for different validation and pass that validation into the function argument.
function withValidationError(validationValues) {
    return [
        validationValues,
        (req, res, next) => {
            const errors = validationResult(req);

            // Check if validation failed
            if (!errors.isEmpty()) {
                // Map all error messages into a response array
                const errorMessage = errors.array().map((error) => error.msg); // Use `.msg` for the actual message
                return res.status(400).json({ errorMessage }); // Respond with the error messages
            }
            next();  // so that next middleware can run also if we dont pass next then the next middleware does'nt run/execute..
        },
    ];
}

export const validateJobInput = withValidationError([
    body("positionTitle").notEmpty().withMessage("Job Position is required"),
    body("companyName").notEmpty().withMessage("Company Name is required"),
    body("description").notEmpty().withMessage("Job description is required"),
    body("aboutRole").notEmpty().withMessage("About Role description is required"),
    body("qualification").notEmpty().withMessage("Qualification description is required"),
    body("responsibility").notEmpty().withMessage("Responsibility description is required"),
    body("location").notEmpty().withMessage("Job location is required"),
    body('package').notEmpty().withMessage("Job package is required"),
    body("applicationStatus")
        .optional() // Allow optional but validate if provided
        .isIn(Object.values(Application_status))
        .withMessage("Invalid job application status"),
    body("employmentType")
        .isIn(Object.values(Employment_Type))
        .withMessage("Invalid job employment type"),
    body("seniorityLevel")
        .isIn(Object.values(Seniority_Level))
        .withMessage("Invalid job seniority level"),
    body("workMode")
        .isIn(Object.values(Work_Mode))
        .withMessage("Invalid job work mode"),
    body("candidateQuota")
        .optional() // Allow optional but validate if provided
        .isIn(Object.values(Candidate_Quota))
        .withMessage("Invalid candidate quota"),
]);


export const validateIdParam = withValidationError([
    param('id')
        .custom(async (value, { req }) => {
            // Validate if the ID is a valid ObjectId

            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Id. The Id doesn't exist");
            }

            // Check if the job exists
            const job = await Job.findById(value);
            if (!job) {
                throw new Error('Job not found');
            }

            // Check permissions 
            const isAdmin = req.user.role === 'admin';
            const isOwner = req.user.userId === job.createdBy.toString();
            if (!isAdmin && !isOwner) {
                throw new Error("You are not allowed to perform this task");
            }

            return true; // Validation passed
        }).withMessage('Invalid Id. Please enter a valid id')
]);

// export const validateIdParam = withValidationError([
//     param('id')
//         .custom(async (value, { req }) => {
//             console.log("User in validateIdParam:", req.user); // Log user info
//             // Validate if the ID is a valid ObjectId
//             if (!mongoose.Types.ObjectId.isValid(value)) {
//                 throw new Error("Invalid Id. The Id doesn't exist");
//             }
//             const job = await Job.findById(value);
//             if (!job) {
//                 throw new Error('Job not found');
//             }
//             // Check permissions 
//             const isAdmin = req.user.role === 'admin';
//             const isOwner = req.user.userId === job.createdBy.toString();
//             if (!isAdmin && !isOwner) {
//                 throw new Error("You are not allowed to perform this task");
//             }
//             return true;
//         }).withMessage('Invalid Id. Please enter a valid id')
// ]);


export const validateUser = withValidationError([
    body('fullName').notEmpty().withMessage('FullName is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Please enter valid email')
        .custom(async (email) => {
            const isEmailExists = await User.findOne({ email })
            if (isEmailExists) {
                throw new Error("Email already exists. Please enter another email")
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('Password should have atleast 8 characters'),
    body('gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isIn(Object.values(User_Gender))
        .withMessage("Invalid Gender"),
    body('status')
        .notEmpty()
        .withMessage('status is required')
        .isIn(Object.values(User_Status))
        .withMessage("Invalid User Status"),
])

export const validateLoginInputs = withValidationError([
    body('email')
        .notEmpty()
        .withMessage("You must enter the email address")
        .isEmail()
        .withMessage('Please enter valid email'),
    body('password')
        .notEmpty()
        .withMessage('password is required')
])

export const validateUpdateUserDetails = withValidationError([
    body('fullName').notEmpty().withMessage('FullName is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(async (email, { req }) => {
            const isEmailExists = await User.findOne({ email });
            if (!isEmailExists) {   //isEmailExists.userId !== req.user.userId
                throw new Error('Email doesnt exists or email doesnt match or you are not authorized to update this email.');
            }
        }),
    // body('location').notEmpty().withMessage('Location is required'),
]);


// for application validation 
export const validateApplicationInputs = withValidationError([
    body("id")
        .notEmpty()
        .withMessage("Job id is required hehe")
        .custom(async (jobId, { req }) => {
            // Validate if the jobId is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(jobId)) {
                throw new Error("Invalid Job ID");
            }

            // Check if the job exists
            const job = await Job.findById(jobId);
            if (!job) {
                throw new Error("Job not found");
            }

            return true; // Validation passed
        }),
    body("resume")
        .notEmpty()
        .withMessage("Resume is required")
        .custom((value, { req }) => {
            // Ensure a file is uploaded and is a valid format
            if (!req.file) {
                throw new Error("Resume file is required");
            }

            const allowedMimeTypes = ["application/pdf", "application/msword"];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                throw new Error("Invalid file type. Only PDF or Word documents are allowed.");
            }

            return true; // Validation passed
        }),
]);

export const validateUserChangePassword = withValidationError([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        // .custom(async (email, { req }) => {
        //     const isEmailExists = await User.findOne({ email });
        //     if (!isEmailExists) {   //isEmailExists.userId !== req.user.userId
        //         throw new Error('Email doesnt exists or email doesnt match or you are not authorized to update this email.');
        //     }
        // }),
        .custom(async (email, { req }) => {
            const isEmailExists = await User.findOne({ email });
            if (!isEmailExists || isEmailExists._id.toString() !== req.user.userId) {
                throw new Error('You are not authorized to update this email.');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('Password should have atleast 8 characters'),

])

export const validateEmailConfirmationCode = withValidationError([
    body('userEmail')
        .notEmpty()
        .withMessage('email is required')
        // .custom(async (email) => {
        //     console.log(email)
        //     const isEmailExists = await User.findOne({ email:userEmail })
        //     if (!isEmailExists) {
        //         throw new Error('Invalid email or email doesnt exists')
        //     }
        // })
])


