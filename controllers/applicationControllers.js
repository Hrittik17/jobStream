import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import dotenv from 'dotenv';

import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import { Application_status } from "../utils/constants.js";
import day from "dayjs"; // For formatting the date

dotenv.config();

console.log('api', process.env.sendGridCode_API_KEY);
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);

export const httpApplyToJob = async (req, res) => {
    try {
        // console.log('req123',req)
        const _id = req.params.id; // Job ID from the request
        const userId = req.user.userId; // User ID from the authenticated user
        const resume = req.file?.path; // Path of the uploaded resume
        console.log('req123', _id, userId, resume);

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
        console.log('abc', userId, _id, resume);
        const application = new Application({
            userId,
            jobId: _id,
            resume,
            status: Application_status.PENDING,
        });
        await application.save();

        res.status(201).json({ message: "Application submitted successfully.", application });
    } catch (error) {
        console.error("Abhishek", error);
        res.status(500).json({ message: "Server error" });
    }
};

// get all job application for a specific job
// export const httpGetJobApplications = async (req, res) => {
//     try {
//         const { _id } = req.params;
//         console.log(_id)

//         const applications = await Application.find({ _id })
//             .populate("userId", "fullName email gender") // Populate user details
//             .sort({ appliedAt: -1 });
//         console.log(applications)

//         res.status(200).json({ applications });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// Fetch all job applications for a specific job
export const httpGetJobApplications = async (req, res) => {
    try {
        const { id } = req.params; // Use 'id' to match the route variable name
        console.log(id);

        const applications = await Application.find({ jobId: id })
            .populate("userId", "fullName email gender") // Populate user details
            .sort({ appliedAt: -1 });

        console.log(applications);

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
        console.log("Applications found:", applications);

        res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", userApplicationError: error.message });
    }
};

// Fetch applications by status (only Accepted)
export const httpGetAcceptedApplications = async (req, res) => {
    try {
        const { id } = req.params; // Get jobId from the route
        
        const applications = await Application.find({jobId:id, status: "Accepted" })
            .populate("userId", "fullName email gender") // Populate user details
            .sort({ appliedAt: -1 });

        if(!applications){
            return res.status(404).json({message:'Didnt have any application'})
        }

        res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// for the accept of a job application by the recruiter
export async function acceptJobApplication(req, res) {
    try {
        const { _id, email } = req.body

        console.log(_id, email)

        // check whether the application exists or not.
        const isJobApplicationsExists = await Application.findById(_id)
        if (!isJobApplicationsExists) {
            return res.status(404).json({ message: "Application not found" })
        }

        if (isJobApplicationsExists.status === "Accepted") {
            return res.status(400).json({ message: "Application already accepted" });
        }

        isJobApplicationsExists.status = "Accepted"
        await isJobApplicationsExists.save()

        await transport.sendMail({
            to: email,
            from: 'tantihrittikkumar@gmail.com',
            subject: 'Your resume has been accepted',
            html: `<h1>Congratulations!</h1>
                <p>Your resume has been accepted. The recruiter will contact you soon.</p>
      `,
        })
        res.status(200).json({ message: "Sent the acceptance of the resume successfully" })
    } catch (error) {
        console.log('Failed to accept the resume', error.message)
        throw new Error(error)
    }
}

// for the pending of a job application by the recruiter
export async function pendingJobApplication(req, res) {
    try {
        const { _id, email } = req.body

        console.log(_id, email)

        // check whether the application exists or not.
        const isJobApplicationsExists = await Application.findById(_id)
        if (!isJobApplicationsExists) {
            return res.status(404).json({ message: "Application not found" })
        }

        if (isJobApplicationsExists.status === "Pending") {
            return res.status(400).json({ message: "Application already on hold" });
        }

        isJobApplicationsExists.status = "Pending"
        await isJobApplicationsExists.save()

        await transport.sendMail({
            to: email,
            from: 'tantihrittikkumar@gmail.com',
            subject: 'Your resume has been accepted',
            html: `<h1>In Stall!</h1>
                <p>Your application is currently on hold. Please wait for further updates</p>
      `,
        })
        res.status(200).json({ message: "Sent the stall of the resume successfully" })
    } catch (error) {
        console.log('Failed to stall the resume', error.message)
        throw new Error(error)
    }
}

// for the accept of a job application by the recruiter
export async function rejectJobApplication(req, res) {
    try {
        const { _id, email } = req.body

        console.log(_id, email)

        // check whether the application exists or not.
        const isJobApplicationsExists = await Application.findById(_id)
        if (!isJobApplicationsExists) {
            return res.status(404).json({ message: "Application not found" })
        }

        if (isJobApplicationsExists.status === "Rejected") {
            return res.status(400).json({ message: "Application already rejected" });
        }

        isJobApplicationsExists.status = "Rejected"
        await isJobApplicationsExists.save()

        await transport.sendMail({
            to: email,
            from: 'tantihrittikkumar@gmail.com',
            subject: 'Your resume has been rejected',
            html: `<h1>Unfortunately!</h1>
                <p>Your resume has been rejected.But dont give up try again.</p>
      `,
        })
        res.status(200).json({ message: "Sent the rejection of the resume successfully" })
    } catch (error) {
        console.log('Failed to reject the resume', error.message)
        throw new Error(error)
    }
}


// for the stats of how many job accepted,rejected,pending of a user
export const httpGetUserApplicationsStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        const applications = await Application.find({ userId })
            .populate("jobId", "positionTitle companyName location") // Populate job details
            .sort({ appliedAt: -1 });

        // Count the number of applications by status
        const stats = {
            Accepted: 0,
            Rejected: 0,
            Pending: 0,
        };

        applications.forEach(application => {
            if (application.status === Application_status.ACCEPTED) stats.Accepted++;
            if (application.status === Application_status.REJECTED) stats.Rejected++;
            if (application.status === Application_status.PENDING) stats.Pending++;
        });

        res.status(200).json({ stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", userApplicationError: error.message });
    }
};



export const httpGetApplicationsForUserJobs = async (req, res) => {
    try {
        const userId = req.user.userId; //req.user.userId

        // console.log('req object :',req.user)


        console.log('suerId in the user applications : ',userId)

        // Find all job IDs created by this user
        const userJobs = await Job.find({ createdBy: userId }).select("_id");

        // Extract job IDs
        const jobIds = userJobs.map(job => job._id);

        // Fetch all applications where jobId matches any job created by the user
        const applications = await Application.find({ jobId: { $in: jobIds } })
            .populate("userId", "fullName email") // Populating applicant details
            .populate("jobId", "positionTitle companyName") // Populating job details
            .sort({ appliedAt: -1 }); // Sorting by latest applications

        // console.log('applications of the all users : ',applications)

        return res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const httpGetRecruiterApplicationStats = async (req, res) => {
    try {
        const userId = req.user.userId; // Recruiter ID

        // Find jobs created by the recruiter
        const userJobs = await Job.find({ createdBy: userId }).select("_id");
        const jobIds = userJobs.map(job => job._id);

        // Count applications based on status
        const totalResumes = await Application.countDocuments({ jobId: { $in: jobIds } });
        const acceptedCount = await Application.countDocuments({ jobId: { $in: jobIds }, status: "Accepted" });
        const rejectedCount = await Application.countDocuments({ jobId: { $in: jobIds }, status: "Rejected" });
        const pendingCount = await Application.countDocuments({ jobId: { $in: jobIds }, status: "Pending" });

        return res.status(200).json({
            totalResumes,
            acceptedCount,
            rejectedCount,
            pendingCount
        });
    } catch (error) {
        console.error("Error fetching application stats:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};




export const httpGetRecruiterResumeStats = async (req, res) => {
    try {
        const userId = req.user.userId

        const stats = await Application.aggregate([
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "job",
                },
            },
            { $unwind: "$job" },
            { $match: { "job.createdBy": new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: {
                        year: { $year: "$appliedAt" },
                        month: { $month: "$appliedAt" },
                        status: "$status",
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: { year: "$_id.year", month: "$_id.month" },
                    totalResumes: { $sum: "$count" },
                    accepted: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "Accepted"] }, "$count", 0],
                        },
                    },
                    rejected: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "Rejected"] }, "$count", 0],
                        },
                    },
                    pending: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "Pending"] }, "$count", 0],
                        },
                    },
                },
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 },
            },
        ]);

        const formattedStats = stats.map(({ _id, totalResumes, accepted, rejected, pending }) => ({
            month: `${_id.year}-${String(_id.month).padStart(2, "0")}`,
            totalResumes,
            accepted,
            rejected,
            pending,
        }));

        res.status(200).json(formattedStats);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export async function httpGetJobsResumesCount(req, res) {
    try {
        const userId = req.user.userId;

        // Find jobs created by the user and count applications for each job
        const jobsWithResumeCounts = await Job.aggregate([
            {
                $match: { createdBy: new mongoose.Types.ObjectId(userId) } // Filter jobs by userId
            },
            {
                $lookup: {
                    from: "applications",
                    localField: "_id",
                    foreignField: "jobId",
                    as: "applications"
                }
            },
            {
                $project: {
                    positionTitle: 1,
                    companyName: 1,
                    resumeCount: { $size: "$applications" } // Count applications
                }
            }
        ]);

        res.status(200).json(jobsWithResumeCounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}



