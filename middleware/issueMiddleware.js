// import { body, validationResult } from 'express-validator';

// function withValidationError(validationValues) {
//     return [
//         validationValues,
//         (req, res, next) => {
//             const errors = validationResult(req);

//             // Check if validation failed
//             if (!errors.isEmpty()) {
//                 // Map all error messages into a response array
//                 const errorMessage = errors.array().map((error) => error.msg); // Use `.msg` for the actual message
//                 return res.status(400).json({ errorMessage }); // Respond with the error messages
//             }
//             next();  // so that next middleware can run also if we dont pass next then the next middleware does'nt run/execute..
//         },
//     ];
// }


// //email,issue
// export const postRaiseIssueValidation = withValidationError([  
//     body('email')
//         .notEmpty()
//         .withMessage('email is required'),
//         // .isEmail()
//         // .withMessage('Please enter a valid email'),
//     body('issue')
//         .notEmpty()
//         .withMessage('issue is required'),
// ])


import { body, validationResult } from "express-validator";

function withValidationError(validationValues) {
    return [
        validationValues,
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map((error) => error.msg);
                return res.status(400).json({ errorMessage });
            }
            next();
        },
    ];
}

// export const postRaiseIssueValidation = withValidationError([
//     body("email")
//         .notEmpty()
//         .withMessage("Email is required")
//         .isEmail()
//         .withMessage("Please enter a valid email"),
//     body("issue").notEmpty().withMessage("Issue is required"),
// ]);

export const postRaiseIssueValidation = withValidationError([
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('issue')
        .notEmpty()
        .withMessage('Issue is required'),
]);
