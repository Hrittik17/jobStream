import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { checkSamePassword, hashPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
// const crypto = require('crypto');
import crypto from 'crypto';
import dotenv from 'dotenv';
import { response } from 'express';

dotenv.config();

console.log('api', process.env.sendGridCode_API_KEY);
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);


function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)) // Generate enough bytes
        .toString('hex') // Convert bytes to hex string
        .slice(0, length); // Slice to get the desired length
}

const randomString = generateRandomString(8); // Generate an 8-character string
console.log(randomString);

const confirmationCodeOtp = generateRandomString(10)

export async function httpGetUserLogin(req, res) {
    res.status(200).json({ message: "Login endpoint reached successfully" });
}


export function httpGetUserSignUp(req, res) {
    res.status(200).json({ message: "user sign up" })
}

// function to create new users
export async function httpCreateUser(req, res) {
    try {
        const userData = req.body
        console.log(userData)

        const isFirstAccount = (await User.countDocuments()) === 0 // first user will be automatically be the admin
        userData.role = isFirstAccount ? 'admin' : 'user';

        const hashedPassword = await hashPassword(userData.password)  // hashed the user password
        userData.password = hashedPassword

        const newUser = await User.create(userData)
        if (!newUser) {
            return res.status(400).json({ message: "failed to create new user" })
        }
        res.status(201).json({ message: 'User created successfully' })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'failed to create' })
    }
}


// function to handle the login i.e with email and password
export async function httpHandleLogin(req, res) {
    const { email, password } = req.body
    const isValidCredentials = await User.findOne({ email: email })
    if (!isValidCredentials) {
        return res.status(401).json({ message: "Invalid credentials please enter valid credentials" })
    }
    const isValidLoginUser = await checkSamePassword(password, isValidCredentials.password)
    if (!isValidLoginUser) {
        return res.status(401).json({ message: 'Please enter valid password' })
    }
    const token = createJWT({ userId: isValidCredentials._id, role: isValidCredentials.role })
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    })
    res.status(200).json({ message: "User Credentials are valid" })
}

export function httpUserLogout(req, res) {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(200).json({ message: "User successfully logged out" })
}

export async function httpSendConfirmationCode(req, res) {
    try {
        const { userEmail } = req.body
        console.log(userEmail)
        const isEmailExists = await User.findOne({ email: userEmail })
        // console.log('isEmailExists', isEmailExists)
        if (!isEmailExists) {
            return res.status(404).json({ message: "User not found" })
        }
        const confirmationCodeOtp = generateRandomString(10);

        // Generate a JWT containing the OTP and email
        // const otpToken = jwt.sign(
        //     { userEmail, confirmationCodeOtp },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "15m" } // OTP expires in 15 minutes
        // );
        // console.log("set otp token",otpToken)

        isEmailExists.confirmationCode = confirmationCodeOtp
        await isEmailExists.save()

        await transport.sendMail({
            to: userEmail,
            from: 'tantihrittikkumar@gmail.com',
            subject: 'Password Confirmation Code',
            html: '<h1> Your password confirmation code is <strong>' + confirmationCodeOtp + '</strong>'
        })
        res.status(200).json({ message: 'OTP send to the registrated email address' })
    } catch (error) {
        console.error('otp error', error)
        res.status(500).json({ message: 'failed to send otp' })
    }
}

export async function httpVerifyOtpAndUpdatePassword(req, res) {
    try {
        const { userEmail, confirmationCode, newPassword } = req.body;
        console.log(userEmail, confirmationCode, newPassword);

        // Ensure the request body contains the necessary fields
        if (!userEmail || !confirmationCode || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log('userEmail:', userEmail, 'confirmationCode:', confirmationCode, 'newPassword:', newPassword);


        // Find the user
        const isUserExists = await User.findOne({ email: userEmail });
        if (!isUserExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the OTP matches

        console.log(isUserExists.confirmationCode, confirmationCode);
        if (isUserExists.confirmationCode !== confirmationCode) {
            return res.status(401).json({ message: "Invalid confirmation code" });
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword)

        // Update the user's password
        isUserExists.password = hashedPassword;
        isUserExists.confirmationCode = ''
        await isUserExists.save();

        res.status(200).json({ message: "Password has been successfully updated" });
    } catch (error) {
        console.error("OTP confirmation error", error);
        res.status(500).json({ message: "Failed to update password" });
    }
}
