import { useNavigate } from "react-router-dom";
import Loader from "../../../ui/loader";
import { useGetUserApplications } from "../../jobApplications/useGetUserApplications";
import ApplicationListInDashboard from "./applicationListInDashboard";

export default function MyApplicationsPreview() {
  const navigate = useNavigate()
  const { UserApplications, userApplicationsLoading, UserApplicationsError } = useGetUserApplications();

  if (userApplicationsLoading) return <Loader />;

  if (UserApplicationsError) return <div className="text-red-500">Error loading applications</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">My Applications</h2>
        <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2" onClick={()=>navigate('/my-applications')}>View All</button>
      </div>
      {UserApplications.length === 0 ? (
        <p className="text-gray-500">You have no applications yet.</p>
      ) : (
        UserApplications
          .filter((_, idx) => idx < 3)
          .map((application) => (
            <ApplicationListInDashboard key={application._id} application={application} />
          ))
      )}
    </div>
  );
}
