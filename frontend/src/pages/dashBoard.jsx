// import AdminDashBoard from "../features/adminDashboard/adminDashBoard";
// import { useCurrentUser } from "../features/authentication/useCurrentUser";
// import MyApplicationStats from "../features/dashboard/applicationStats/myApplicationStats";
// import StatsDisplay from "../features/dashboard/applicationStats/statsDisplay";
// import UserApplicationBarChart from "../features/dashboard/applicationStats/useApplicationBarChart";
// import UserMontlyApplication from "../features/dashboard/applicationStats/UsermontlyApplication";
// import DashboardCalender from "../features/dashboard/dashboardCalender";
// import JobsPreview from "../features/dashboard/jobsPreview/JobsPreview";
// import MyApplicationsPreview from "../features/dashboard/myApplicationPreview/myApplicationsPreview";
// import MiniNews from "../features/dashboard/newsPreview/miniNews";
// import UserDetailsDashboard from "../features/dashboard/userDetails/userDetailsDashboard";
// import Loader from "../ui/loader";
// import NotFound from "../ui/notFound";

// export default function DashBoard() {
//   const {currentUser,currentUserLoading,currentUserError,message,currentUserRefetch} = useCurrentUser()

//   if(currentUserLoading) return <Loader/>
//   if(currentUserError) return <NotFound/>
//   return (
//     <div className="container mx-auto p-6">
//       {currentUser?.role === 'admin' && (<AdminDashBoard/>)}
//       {currentUser?.role !== 'admin' || currentUser?.status !== 'recruiter' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="col-span-1 md:col-span-2">
//           <StatsDisplay />
//         </div>
//         <div className="col-span-1 md:col-span-1">
//           <UserDetailsDashboard/>
//         </div>
//         <div className="col-span-1 md:col-span-1">
//           <MyApplicationStats />
//         </div>
//         <div className="col-span-1 md:col-span-1">
//           <DashboardCalender />
//         </div>
//         <div className="col-span-1 md:col-span-1">
//           <MiniNews numberOfArticles={5} />
//         </div>
//         <div className="col-span-1 md:col-span-1 lg:col-span-2">
//           <MyApplicationsPreview />
//         </div>
//         <div className="col-span-1 md:col-span-1">
//           <JobsPreview />
//         </div>
//       )} 
//       </div>
//     </div>
//   );
// }


import AdminDashBoard from "../features/adminDashboard/adminDashBoard";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import ContactsList from "../features/contacts/contactsList";
import MyApplicationStats from "../features/dashboard/applicationStats/myApplicationStats";
import StatsDisplay from "../features/dashboard/applicationStats/statsDisplay";
import UserApplicationBarChart from "../features/dashboard/applicationStats/useApplicationBarChart";
import UserMontlyApplication from "../features/dashboard/applicationStats/UsermontlyApplication";
import DashboardCalender from "../features/dashboard/dashboardCalender";
import JobsPreview from "../features/dashboard/jobsPreview/JobsPreview";
import MyApplicationsPreview from "../features/dashboard/myApplicationPreview/myApplicationsPreview";
import MiniNews from "../features/dashboard/newsPreview/miniNews";
import UserDetailsDashboard from "../features/dashboard/userDetails/userDetailsDashboard";
import RecruiterDashboard from "../features/recruiterDashboard/recruiterDashboard";
import Loader from "../ui/loader";
import NotFound from "../ui/notFound";

export default function DashBoard() {
  const { currentUser, currentUserLoading, currentUserError, message, currentUserRefetch } = useCurrentUser();

  if (currentUserLoading) return <Loader />;
  if (currentUserError) return <NotFound />;

  return (
    <div className="container mx-auto p-6">
      {currentUser?.role === "admin" && <AdminDashBoard />}
      {currentUser?.status === 'recruiter' && (<RecruiterDashboard/>)}
      {currentUser?.role !== "admin" && currentUser?.status !== "recruiter" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <StatsDisplay />
          </div>
          <div className="col-span-1 md:col-span-1">
            <UserDetailsDashboard />
          </div>
          <div className="col-span-1 md:col-span-1">
            <MyApplicationStats />
          </div>
          <div className="col-span-1 md:col-span-1">
            <DashboardCalender />
          </div>
          {/* <div className="col-span-1 md:col-span-1">
            <MiniNews numberOfArticles={5} />
          </div> */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <MyApplicationsPreview />
          </div>
          <div className="col-span-1 md:col-span-1">
            <JobsPreview />
          </div>
          <div className="col-span-1 md:col-span-1">
            <ContactsList />
          </div>
        </div>
      ) : null}
    </div>
  );
}
