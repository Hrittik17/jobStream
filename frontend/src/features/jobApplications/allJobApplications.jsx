import { useNavigate } from "react-router-dom";
import JobsNotFound from "../allJobs/jobsNotFound";
import { useGetUserApplications } from "./useGetUserApplications";
import UserApplicationList from "./userApplicationList";
import Loader from "../../ui/loader"
// import UserApplicationList from "./UserApplicationList";
// import JobApplicationsStats from "./jobApplicationsStats";

export default function AllJobApplications() {
  const navigate = useNavigate()
  const { UserApplications, userApplicationsLoading, UserApplicationsError } = useGetUserApplications();

  if (userApplicationsLoading) return <Loader/>;
  if (UserApplicationsError) return <div>Error: {UserApplicationsError.message}</div>

  if(!UserApplications || UserApplications.length === 0){
    return <JobsNotFound/>
  }

  return (
    <div>
      <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-8" onClick={()=>navigate(-1)}>&larr; back</button>
      {UserApplications.map((application) => (
        <UserApplicationList key={application._id} application={application} />
      ))}
      {/* <JobApplicationsStats/> */}
    </div>
  );
}
