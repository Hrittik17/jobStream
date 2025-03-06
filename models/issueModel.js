import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
    email:{
        type:'string',
        // ref:'User',
        required:true,
    },
    issue:{
        type:'string',
        required:true
    }
},{timestamps:true})

export default mongoose.model('Issue',IssueSchema)