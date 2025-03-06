import { useNavigate } from "react-router-dom";
import Loader from "../../../ui/loader"
import { useGetAllJobsPost } from "../../allJobs/useAllJobsPost"
import JobPostPreviewList from "./jobPostPreviewList";

export default function JobsPreview() {
    const navigate = useNavigate()
    const { JobPosts, jobPostLoading } = useGetAllJobsPost();

    if (jobPostLoading) return <Loader />;

    const { allJobs } = JobPosts

    console.log(JobPosts)
    return (
        <>
            <div className="p-4 bg-white shadow-md rounded-lg">
                <div className="mt-6 flex justify-between">
                    <h1>All Jobs</h1>
                    <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => navigate('/findJobs')}>View All</button>

                </div>
                <div className="space-y-4">
                    {allJobs
                        .filter((_, index) => index < 4)
                        .map((jobs) => (
                            <JobPostPreviewList key={jobs._id} jobs={jobs} />
                        ))}
                </div>
            </div>
        </>
    );
}


