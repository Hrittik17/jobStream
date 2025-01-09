import User from '../models/userModel.js';
import { checkSamePassword, hashPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';
import nodeMailer from 'nodemailer';
import sendGridTransport from 'nodemailer-sendgrid-transport';
// const crypto = require('crypto');
import crypto from 'crypto';

const transporter = nodeMailer.createTransport(sendGridTransport({
    auth:{
        api_key:process.env.sendGridCode_API_KEY
    }
}));


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


export function httpGetUserSignUp(req,res){
    res.status(200).json({message:"user sign up"})
}
 
// function to create new users
export async function httpCreateUser(req,res){
    try{
        const userData = req.body
        console.log(userData)

        const isFirstAccount = (await User.countDocuments()) === 0 // first user will be automatically be the admin
        userData.role = isFirstAccount ? 'admin' : 'user';

        const hashedPassword = await hashPassword(userData.password)  // hashed the user password
        userData.password = hashedPassword

        const newUser = await User.create(userData)
        if(!newUser){
           return res.status(400).json({message:"failed to create new user"})
        }
        res.status(201).json({message:'User created successfully'})
    }catch(err){
        console.error(err.message)
        res.status(500).json({message:'failed to create'})
    }
}


// function to handle the login i.e with email and password
export  async function httpHandleLogin(req,res){
    const {email,password} = req.body
    const isValidCredentials = await User.findOne({email:email})
    if(!isValidCredentials){
        return res.status(401).json({message:"Invalid credentials please enter valid credentials"})
    }
    const isValidLoginUser = await checkSamePassword(password,isValidCredentials.password)
    if(!isValidLoginUser){
        return res.status(401).json({message:'Please enter valid password'})
    }
    const token = createJWT({userId:isValidCredentials._id,role:isValidCredentials.role})
    const oneDay = 1000*60*60*24
    res.cookie('token',token,{
        httpOnly: true,
        expires:new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production', 
    })
    res.status(200).json({message:"User Credentials are valid"})
}

export function httpUserLogout(req,res){
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    res.status(200).json({message:"User successfully logged out"})
}

export async function httpPasswordConfirmationCode(req,res){
    try{
        const {email,password,confirmationCode} = req.body
        const isEmailExists = await User.findOne({email})
        if(!isEmailExists){
            return res.status(404).json({message:"User not found"})
        }
        const confirmationCodeOtp = generateRandomString(10)
        await transporter.sendMail({
            to:email,
            from:'noreply@test.com',
            subject:'Password Confirmation Code',
            html:'<h1> Your password confirmation code is <strong>' + confirmationCodeOtp + '</strong>'
        })
        if(!confirmationCode === confirmationCodeOtp){
            return response.status(400).json({message: 'Invalid password confirmation code. Enter valid code'})
        }

        const hashedPassword = await hashPassword(password)
        isEmailExists.password = hashedPassword

        await isEmailExists.save()

        res.status(200).json({message:'Password has been successfully updated'})
    }catch(error){
        console.error(error.message)
        res.status(500).json({message:'failed to update password'})
    }
}


export async function httpSendConfirmationCode(req,res){
    try{
        const {userEmail} = req.body
        console.log(userEmail)
        const isEmailExists = await User.findOne({email:userEmail})
        if(!isEmailExists){
            return res.status(404).json({message:"User not found"})
        }
        // const confirmationCodeOtp = generateRandomString(10)
        await transporter.sendMail({
            to:userEmail,
            from:'noreply@test.com',
            subject:'Password Confirmation Code',
            html:'<h1> Your password confirmation code is <strong>' + confirmationCodeOtp + '</strong>'
        })
        res.status(200).json({message:'OTP send to the registrated email address'})
    }catch(error){
        console.error(error.message)
        res.status(500).json({message:'failed to send otp'})
    }
}