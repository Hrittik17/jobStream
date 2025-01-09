import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import { Application_status } from "../utils/constants.js";

export const httpApplyToJob = async (req, res) => {
    try {
        // console.log('req123',req)
        const  _id  = req.params.id; // Job ID from the request
        const userId = req.user.userId; // User ID from the authenticated user
        const resume = req.file?.path; // Path of the uploaded resume
        console.log('req123',_id,userId,resume);

        // Check if the job exists
        const job = await Job.findById(_id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the user has already applied
        const existingApplication = await Application.findOne({ _id, userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        // Create a new application
        console.log('abc', userId,_id,resume);
        const application = new Application({
            userId,
            jobId:_id,
            resume,
            status: Application_status.PENDING,
        });
        await application.save();

        res.status(201).json({ message: "Application submitted successfully.", application });
    } catch (error) {
        console.error("Abhishek",error);
        res.status(500).json({ message: "Server error" });
    }
};

// get all job application for a specific job
export const httpGetJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;

        const applications = await Application.find({ jobId })
            .populate("userId", "fullName email gender") // Populate user details
            .sort({ appliedAt: -1 });

        res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// Fetch all applications submitted by a specific user.
export const httpGetUserApplications = async (req, res) => {
    try {
        const userId = req.user.userId;

        const applications = await Application.find({ userId })
            .populate("jobId", "positionTitle companyName location") // Populate job details
            .sort({ appliedAt: -1 });

        res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


