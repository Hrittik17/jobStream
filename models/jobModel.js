import mongoose from "mongoose";
import {
    Application_status,
    Employment_Type,
    Seniority_Level,
    Work_Mode,
    Candidate_Quota,
} from "../utils/constants.js";

const jobSchema = new mongoose.Schema(
    {
        positionTitle: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        aboutRole:{
            type:String,
            required:true,
        },
        qualification:{
            type:String,
            required:true,
        },
        responsibility:{
            type:String,
            required:true
        },
        package:{
            type:Number,
            required:true,
        },
        applicationStatus: {
            type: String,
            enum: Object.values(Application_status),
            default: Application_status.PENDING,
        },
        employmentType: {
            type: String,
            enum: Object.values(Employment_Type),
            required: true,
        },
        seniorityLevel: {
            type: String,
            enum: Object.values(Seniority_Level),
            required: true,
        },
        workMode: {
            type: String,
            enum: Object.values(Work_Mode),
            required: true,
        },
        location: {
            type: String,
            default: "my city",
        },
        candidateQuota: {
            type: String,
            enum: Object.values(Candidate_Quota),
        },
        createdBy:{
            type: mongoose.Types.ObjectId,
            ref:'User'
        },
    },
    { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
