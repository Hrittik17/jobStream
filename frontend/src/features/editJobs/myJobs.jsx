import JobsLayout from "./jobslayout";
import { useAllJobs } from "../allJobs/useAllJobs"
import Loader from "../../ui/loader";
import JobsNotFound from "../allJobs/jobsNotFound";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AllJobsPerResumes from "./allJobsPerResumes";
import BackButton from "../../ui/backButton";


export default function MyJobs() {
  const navigate = useNavigate()
  const { AllJobs, allJobsLoading } = useAllJobs();
  const [showAllResumes, setShowAllResumes] = useState(false)
  const [showMyJobs, setShowMyJobs] = useState(true)

  if (allJobsLoading) {
    return <Loader />;
  }
  if (AllJobs.length === 0) {
    return <JobsNotFound />
  }

  if (!Array.isArray(AllJobs)) {
    return <JobsNotFound />
  }

  function showAllResumesHandler() {
    setShowAllResumes(true)
    setShowMyJobs(false)
  }

  function showAllMyjobs(){
    setShowAllResumes(false)
    setShowMyJobs(true)
  }

  return (
    <>
      <BackButton />
      <div className="container mx-auto p-4 mt-8">
        <div className="flex gap-4 mb-8">
          {!showMyJobs && 
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300" onClick={showAllMyjobs}>Show my jobs</button>
          }
          <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300" onClick={showAllResumesHandler}>Resumes per jobs</button>
        </div>

        <div>
          {showAllResumes && (<AllJobsPerResumes />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {showMyJobs && AllJobs.map((allJob) => {
            return (
              <JobsLayout key={allJob._id} allJob={allJob} />
            )
          })}
        </div>
      </div>
    </>
  )
}
