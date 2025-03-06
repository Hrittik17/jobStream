import mongoose from "mongoose";
import { User_Gender, User_Status } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
    fullName:{
        type:'string',
        required:true,
    },
    email:{
        type:'string',
        required:true,
    },
    password:{
        type:'string',
        required:true,
    },
    gender:{
        type:'string',
        enum:Object.values(User_Gender),
        required:true,
    },
    status:{
        type:'string',
        enum:Object.values(User_Status),
        required:true
    },
    avatar:{
        type:'string'
    },
    avatarPublicId:{
        type:'string'
    },
    points:{
        type:Number,
        default:10,
    },
    role:{
        type:'string',
        enum:['user','admin'],
        default:'user',
    },
    confirmationCode:{
        type:'string'
    },
    Contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

// a instance method to delete the password when we are fetching the current user 
userSchema.methods.toJSON = function (req,res){
    let obj = this.toObject()   // converts the document to a plain javascript object
    delete obj.password
    return obj
}

export default mongoose.model('User',userSchema)
