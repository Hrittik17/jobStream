import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";

day.extend(advancedFormat);

// Get home page
export function httpGetHomePage(req, res) {
    try {
        res.status(200).json({ message: "Welcome to the page" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get all jobs
export async function httpGetAllJobs(req, res) {
    try {
        // console.log(req.user)
        // if(req.user.status === 'recruiter'){   // for recruiters to get the jobs they created
        //     const recruiterJobs = await Job.find({createdBy:req.user.userId})
        //     return res.status(200).json(recruiterJobs)
        // }
        const jobs = await Job.find({createdBy:req.user.userId})  //{createdBy:req.user.userId}
        if(!jobs){
            return res.status(404).json({message: "Job not found"})
        }
        if(jobs.length === 0){
            return res.json({message:"No job found"})
        }
        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch jobs" });
    }
}

// Get a single job
export async function httpGetSingleJobDetails(req, res) {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch job details" });
    }
}

// Create a job
export async function httpCreateJob(req, res) {
    try {
        req.body.createdBy = req.user.userId
        const jobData = req.body;
        const createdJob = await Job.create(jobData);
        res.status(201).json({ message: "Job created successfully", job: createdJob });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create job" });
    }
}

// Edit job
export async function httpEditJobDetails(req, res) {
    try {
        const { id } = req.params;
        const jobData = req.body;
        const updatedJob = await Job.findByIdAndUpdate(id, jobData, { new: true });
        if (!updatedJob) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update job" });
    }
}

// Delete a job
export async function httpDeleteJob(req, res) {
    try {
        const { id } = req.params;
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job deleted successfully", job: deletedJob });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete job" });
    }
}

// export async function httpGetAllJobsPost(req,res){
//     try{
//         const {search,sort} = req.query
//         // if(!search) return
//         const searchObject = {}
//         if(search){
//             searchObject.$or =[{position:{$regex:search,$options:'i'}},{location:{$regex:search,$options:'i'}},{employmentType:{$regex:search,$options:'i'}},{seniorityLevel:{$regex:search,$options:'i'}},{workMode:{$regex:search,$options:'i'}}]
//         }
//         const sortOptions ={
//             newest:'createdAt',
//             oldest:'-createdAt',
//             ascending:'positionTitle',
//             decending:'-positionTitle'
//         }
//         const sortKey = sortOptions[sort || sortOptions.newest]

//         // adding pagination logic

//         const page = +req.query.page || 1
//         const limit = +req.query.limit || 2
//         const skip = (page-1)*limit;


//         const allJobs = await Job.find(searchObject).sort(sortKey).skip(skip).limit(limit)


//         const totalJobs = await Job.find(searchObject)

//         const numberOfPages = Math.ceil(totalJobs/limit)


//         if(!allJobs || !totalJobs){
//             return res.status(404).json({ message: "Jobs not found" });
//         }
//         res.status(200).json({totalJobs,numberOfPages,currentPage:page,allJobs})
//     }catch(error){
//         console.error(error)
//         res.status(500).json({message: "Failed to get jobs" });
//     }
// }

export async function httpGetSingleJobPostsDetails(req, res) {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch job details" });
    }
}


export async function httpGetAllJobsPost(req, res) {
    try {
        const { search, sort } = req.query;

        // Build search filter
        const searchObject = {};
        if (search) {
            searchObject.$or = [
                { position: { $regex: search, $options: 'i' } },
                { location: { $regex: location, $options: 'i' } },
                { employmentType: { $regex: employmentType, $options: 'i' } },
                { seniorityLevel: { $regex: seniorityLevel, $options: 'i' } },
                { workMode: { $regex: workMode, $options: 'i' } },
            ];
        }

        // Sorting logic
        const sortOptions = {
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            ascending: { positionTitle: 1 },
            descending: { positionTitle: -1 },
        };
        const sortKey = sortOptions[sort] || sortOptions.newest;

        // Pagination logic
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
        const skip = (page - 1) * limit;

        // Fetch jobs and total count
        const allJobs = await Job.find(searchObject).sort(sortKey)    //.skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments(searchObject);
        const numberOfPages = Math.ceil(totalJobs / limit);

        // Handle no jobs found
        if (!allJobs.length) {
            return res.status(404).json({ message: "No jobs found" });
        }

        // Send response
        res.status(200).json({
            totalJobs,
            numberOfPages,
            currentPage: page,
            allJobs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get jobs" });
    }
}


// Not found
export function httpNotFoundPage(req, res) {
    res.status(404).json({ message: "Page not found" });
}

// to get the jobs stats by the users who created it 
export async function httpGetJobsStats(req,res){
    let stats = await Job.aggregate([
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}}, // it will return all the jobs created by the user
        {$group:{_id:'$applicationStatus',count:{$sum:1}}}  // it will group the jobs based on their status
    ])
    console.log(stats)


    stats = stats.reduce((acc,curr)=>{   // just looping through values
        const {_id,count} = curr
        acc[_id] = count;
        return acc
    },{})

    let monthlyApplications = await Job.aggregate([
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{
            _id:{year:{$year:'$createdAt'},month:{$month:'$createdAt'}},
            count:{$sum:1},
        },
    },
    {$sort:{'_id.year':-1,'_id.month':-1}},
    {$limit:4},
    ])

    monthlyApplications = monthlyApplications.map((items)=>{
        const {_id:{year,month},count} = items

        const date = day().month(month - 1).year(year).format("MMM,YY")
        return {date,count}

    }).reverse()
    
    res.status(200).json({stats,monthlyApplications})
} 