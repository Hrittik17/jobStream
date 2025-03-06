import express from 'express';
import {
    httpGetUserLogin,
    httpGetUserSignUp,
    httpCreateUser,
    httpHandleLogin,
    httpUserLogout,
    httpSendConfirmationCode,
    httpVerifyOtpAndUpdatePassword
} from '../controllers/authControllers.js'
import { validateEmailConfirmationCode, validateLoginInputs, validateUser, validateUserChangePassword } from '../middleware/validationMiddleware.js';

import rateLimiter from 'express-rate-limit'
import { httpUserChangePassword } from '../controllers/userControllers.js';

const authRouter = express.Router()

const apiLimiter = rateLimiter({
    windowMs:15 * 60 * 1000, // 15 minutes
    max:20,
    message:{message:"Too many requests, please try again after 15 minutes"}
})

// get request for the /auth/login 
authRouter.get('/login',validateLoginInputs,httpGetUserLogin)

// routes and controllers for creating a new user (/auth/signUp)
authRouter.post('/signUp',validateUser,httpCreateUser)

authRouter.post('/send-otp',validateEmailConfirmationCode,httpSendConfirmationCode)

authRouter.post('/verify-otp',httpVerifyOtpAndUpdatePassword)


// authRouter.patch('/change-password',validateUserChangePassword,httpUserChangePassword)

// post request for the /auth/login for the login function
authRouter.post('/login',validateLoginInputs,httpHandleLogin)

// get request for the logout function /auth/logout
authRouter.get('/logout',httpUserLogout)

export default authRouter;