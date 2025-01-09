import { useAllJobs } from "./useAllJobs";
import AllJobCard from "./AllJobCard";
import Loader from "../../ui/loader";
import { useGetAllJobsPost } from "./useAllJobsPost";
import JobsNotFound from "./jobsNotFound";

export default function AllJobsLayout() {
  // const { AllJobs, allJobsLoading } = useAllJobs();
  const { JobPosts, jobPostLoading } = useGetAllJobsPost()

  if (jobPostLoading) {
    return <Loader />;
  }
  if (!JobPosts || JobPosts.length === 0) {
    return <JobsNotFound />
  }

  const {allJobs} = JobPosts
  console.log(allJobs)
  console.log(JobPosts)
 

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allJobs.map((jobPost) => (
          <AllJobCard key={jobPost._id} jobPost={jobPost} />
        ))}
      </div>
    </div>
  );
}
