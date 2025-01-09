import mongoose from "mongoose";
import { Application_status } from "../utils/constants.js";

const applicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        jobId: {
            type: mongoose.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        resume: {
            type: String, // URL to the uploaded resume
            required: true,
        },
        resumePublicId: {
            type: String, // For cloud storage (optional)
        },
        status: {
            type: String,
            enum: Object.values(Application_status),
            default: Application_status.PENDING,
        },
        appliedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
