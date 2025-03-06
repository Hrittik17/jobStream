import mongoose, { Schema } from "mongoose";

const messagesSchema = new mongoose.Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    content:{
        type:String
    },
    date:{
        type:Date
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Tracks users who have read the message
},{timestamps:true})

export default mongoose.model('Message',messagesSchema)