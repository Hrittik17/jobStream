import JobsLayout from "./jobslayout";
import { useAllJobs } from "../allJobs/useAllJobs"
import Loader from "../../ui/loader";
import JobsNotFound from "../allJobs/jobsNotFound";


export default function MyJobs() {
  const { AllJobs, allJobsLoading } = useAllJobs();

  if (allJobsLoading) {
    return <Loader />;
  }
  if(AllJobs.length === 0){
    return <JobsNotFound/>
  }

  if (!Array.isArray(AllJobs)) {
    return <JobsNotFound/>
  }
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {AllJobs.map((allJob) => {
          return (
            <JobsLayout key={allJob._id} allJob={allJob} />
          )
        })}
      </div>
    </div>
  )
}
