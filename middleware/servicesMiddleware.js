import { body, param } from 'express-validator';
import { validationResult } from 'express-validator';
import Services from '../models/servicesModel.js'
import mongoose from 'mongoose';

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

// Validation for service post
export const postServicesValidation = withValidationError([
    body('title')
        .notEmpty()
        .withMessage('Title is required.')
        .trim(),
    body('description')
        .notEmpty()
        .withMessage('Description is required.')
        .trim(),
    body('category')
        .notEmpty()
        .withMessage('Category is required.')
        .isIn(['Web Designer', 'UI/UX', 'Data Entry', 'Web Developer', 'Android', 'iOS', 'Other'])
        .withMessage('Invalid category.'),
    body('servicesAmount')
        .notEmpty()
        .withMessage('Services amount is required.')
        .isFloat({ min: 0 })
        .withMessage('Services amount must be a positive number.'),
    body('userId')
        .notEmpty()
        .withMessage('User ID is required.')
        .isMongoId()
        .withMessage('User ID must be a valid MongoDB ObjectId.'),
    body('projectLink')
        .notEmpty()
        .withMessage('Project link is required.')
        .isURL()
        .withMessage('Project link must be a valid URL.'),
])

export const validateServiceId = withValidationError([
    param("id")
        .notEmpty()
        .withMessage("Job id is required")
        .custom(async (value, { req }) => {
                    // Validate if the ID is a valid ObjectId
        
                    if (!mongoose.Types.ObjectId.isValid(value)) {
                        throw new Error("Invalid Id. The Id doesn't exist");
                    }
        
                    // Check if the job exists
                    const service = await Services.findById(value);
                    if (!service) {
                        throw new Error('service not found');
                    }
        
                    return true; // Validation passed
                }).withMessage('Invalid Id. Please enter a valid id')
])