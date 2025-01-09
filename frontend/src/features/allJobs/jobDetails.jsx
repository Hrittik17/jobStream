import { useJobDetails } from "./useJobDetails";
import Loader from "../../ui/loader";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useEffect, useState } from "react";
import { useGetAllJobPostById } from "./useGetAllJobsPostById";
import { useApplyJob } from "../applyJobs/useApplyJob";

day.extend(advancedFormat);

export default function JobDetails() {
    // const { jobDetails, jobDetailsLoading, error } = useJobDetails();
    const { jobPostDetails, jobPostDetailsLoading, error } = useGetAllJobPostById()
    const { currentUser, currentUserLoading } = useCurrentUser()
    const { ApplyJob, jobApplyLoading } = useApplyJob()
    const [resume, setResume] = useState(null);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate('/Login')
    //     }
    // }, [currentUser, navigate])

    if (jobPostDetailsLoading && currentUserLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-center text-red-500">Failed to load job details.</p>;
    }

    if (!jobPostDetails) {
        return <p className="text-center text-gray-500">Job not found.</p>;
    }


    const handleFileChange = (event) => {
        
        console.log('handleFileChange', event.target.files[0]);
        setResume(event.target.files[0]);
    };

    const {_id:jobId} = jobPostDetails
    console.log(jobId)

    const {_id:currentUserId,fullName,email} = currentUser
    console.log(currentUserId,fullName,email)


    const handleApply = (event) => {
        event.preventDefault();
        console.log('Resume on handleApply', resume);

        if (!resume) {
            alert("Please upload your resume before applying.");
            return;
        }
        console.log('jobpost', jobPostDetails);
        const formData = new FormData();
        formData.append("resume", resume); // Attach the resume
        formData.append("jobId", jobPostDetails._id); // Attach the job ID (if needed)
        formData.append("userId",currentUserId); // Attach the user ID (if needed)
        console.log('form-data',formData);
        ApplyJob(formData);
        console.log('random')
    };

    const {
        _id,
        positionTitle,
        companyName,
        seniorityLevel,
        employmentType,
        workMode,
        location,
        description,
        package: jobPackage,
        candidateQuota,
        applicationStatus,
        createdAt,
        responsibility,
        aboutRole,
        qualification,
    } = jobPostDetails;

    const getStatusStyles = (applicationStatus) => {
        switch (applicationStatus) {
            case "Pending":
                return "bg-yellow-300 text-yellow-800";
            case "Accepted":
                return "bg-green-300 text-green-800";
            default:
                return "bg-gray-300 text-gray-800";
        }
    };


    return (
        <div className="container mx-auto px-6 py-12">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 mb-6"
                    aria-label="Go back to previous page"
                >
                    Back
                </button>

                {/* Job Title and Company Name */}
                <h1 className="text-3xl font-bold text-gray-800">{positionTitle}</h1>
                <p className="text-xl text-gray-500 mt-2">{companyName}</p>

                {/* Job Details */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <p className="text-gray-600">
                            <strong>Seniority Level:</strong> {seniorityLevel}
                        </p>
                        <p className="text-gray-600">
                            <strong>Employment Type:</strong> {employmentType}
                        </p>
                        <p className="text-gray-600">
                            <strong>Work Mode:</strong> {workMode}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">
                            <strong>Location:</strong> {location}
                        </p>
                        <p className="text-gray-600">
                            <strong>Package:</strong> ₹{jobPackage}
                        </p>
                        <p className="text-gray-600">
                            <strong>Candidates:</strong> {candidateQuota}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">
                            <strong>Posted On:</strong> {day(createdAt).format("MMMM D, YYYY")}
                        </p>
                        <p className={`text-sm font-semibold ${getStatusStyles(applicationStatus)}`}>
                            <strong>Status:</strong> {applicationStatus}
                        </p>
                    </div>
                </div>

                {/* Job Description */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description</h2>
                    <p className="text-gray-600">{description}</p>
                </div>

                {/* Responsibilities */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Responsibilities</h2>
                    <p className="text-gray-600">{responsibility}</p>
                </div>

                {/* About the Role */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">About the Role</h2>
                    <p className="text-gray-600">{aboutRole}</p>
                </div>

                {/* Qualifications */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Qualifications</h2>
                    <p className="text-gray-600">{qualification}</p>
                </div>

                {/* Apply Button */}
                {/* <div className=" flex justify-end gap-8 mt-10 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-600 transition duration-300"
                        aria-label="Go back to previous page"
                    >
                       &larr; Back
                    </button>
                    <button
                        className="bg-green-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-green-600 transition duration-300"
                        aria-label="Apply for this job"
                    >
                        Apply Now
                    </button>
                </div> */}
                <div className="mt-8">
                    <form encType="multipart/form-data" method="POST">
                        <label className="block text-gray-700 font-bold mb-2">Upload Resume:</label>
                        <input
                            type="file"
                            accept=".pdf, .doc, .docx"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                        />
                        <div>
                            <label htmlFor="userId">UserId</label>
                            <input type="text" value={currentUser._id} disabled />
                        </div>
                        <div>
                            <label htmlFor="jobId">Job Id</label>
                            <input type="text" value={_id} disabled />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-600 transition duration-300"
                                aria-label="Go back to previous page"
                            >
                                &larr; Back
                            </button>

                            <button
                                onClick={handleApply}
                                className="bg-green-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-green-600 transition duration-300"
                                disabled={jobApplyLoading}
                            >
                                {jobApplyLoading ? "Applying..." : "Apply Now"}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

