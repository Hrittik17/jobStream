// import { useNavigate } from "react-router-dom";
// import { useAllJobApplications } from "./useAllApplications";
// import Loader from "../../ui/loader";
// import DataNotFound from "../../ui/dataNotFound";
// import ApplicationsList from "./ApplicationsList";

// export default function UserApplications() {
//   const navigate = useNavigate();
//   const { data, isLoading, isError } = useAllJobApplications();

//   if (isLoading) return <Loader />;
//   if (!data.applications || data.applications.length === 0)
//     return <DataNotFound title={"Applications"} />;
//   if (isError) return <DataNotFound title={"Applications"} />;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-center mb-6">Job Applications</h1>
//       {data.applications.map((application)=>{
//         return(
//           <ApplicationsList key={application._id} applications={application}/>
//         )
//       })}
//     </div>
//   )
// }




// import { useNavigate } from "react-router-dom";
// import { useAllJobApplications } from "./useAllApplications";
// import Loader from "../../ui/loader";
// import DataNotFound from "../../ui/dataNotFound";
// import ApplicationsList from "./ApplicationsList";

// export default function UserApplications() {
//   const navigate = useNavigate();
//   const { data, isLoading, isError } = useAllJobApplications();

//   if (isLoading) return <Loader />;
//   if (!data.applications || data.applications.length === 0)
//     return <DataNotFound title={"Applications"} />;
//   if (isError) return <DataNotFound title={"Applications"} />;

//   return (
//     <div className="p-4">
//       <div>
//         <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>navigate(-1)}>&larr; back</button>
//       </div>
//       <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
//         Job Applications
//       </h1>
//       <div className="space-y-6">
//         {data.applications.map((application) => (
//           <ApplicationsList key={application._id} applications={application} />
//         ))}
//       </div>
//     </div>
//   );
// }


import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAllJobApplications } from "./useAllApplications";
import Loader from "../../ui/loader";
import DataNotFound from "../../ui/dataNotFound";
import ApplicationsList from "./ApplicationsList";

export default function UserApplications() {
  const navigate = useNavigate();
  const {id} = useParams()
  const { data, isLoading, isError } = useAllJobApplications();

  if (isLoading) return <Loader />;
  if (!data.applications || data.applications.length === 0)
    return <DataNotFound title={"Applications"} />;
  if (isError) return <DataNotFound title={"Applications"} />;

  const applicationStatus = data.applications.status

  console.log(id)

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-6">
        <div>
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => navigate(-1)}>&larr; back</button>
        </div>

        <div>
          <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => navigate(`/my-jobs/${id}/all-applications/shortlisted-candidates`)}>Shortlist Candidates</button>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Job Applications
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.applications.map((application) => (
          <ApplicationsList key={application._id} applications={application} applicationStatus={applicationStatus} />
        ))}
      </div>
    </div>
  );
}
