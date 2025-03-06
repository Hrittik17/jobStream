// import { useState } from "react";
// import { useCurrentUser } from "../features/authentication/useCurrentUser";
// import StatsDisplay from "../features/dashboard/applicationStats/statsDisplay";
// import UserApplicationBarChart from "../features/dashboard/applicationStats/useApplicationBarChart";
// import UserMontlyApplication from "../features/dashboard/applicationStats/UsermontlyApplication";
// import ChartContainer from "../features/stats/chartContainer";
// // import MonthlyApplicationsPieChart from "../features/stats/pieChart";
// import StatsContainer from "../features/stats/statsContainer";
// import { useJobStats } from "../features/stats/useJobStats";
// import Loader from "../ui/loader";
// import NotFound from "../ui/notFound";
// import MyApplicationStats from "../features/dashboard/applicationStats/myApplicationStats";
// import SubscriptionStatsPage from "../features/subscription/userSubscriptionStats";
// import AdminSubscription from "../features/subscription/adminSubscription";

// export default function Stats() {
//   const { jobStats, jobStatsLoading } = useJobStats();
//   const { currentUser, currentUserLoading } = useCurrentUser();
//   const [showBarChart, setShowBarChart] = useState(false)
//   const [showLineChart, setShowLineChart] = useState(false)
//   const [showPieChart, setShowPieChart] = useState(false)

//   function displayPieChart() {
//     setShowPieChart(true)
//     setShowBarChart(false)
//     setShowLineChart(false)
//   }

//   function displayBarChart() {
//     setShowBarChart(true)
//     setShowLineChart(false)
//     setShowPieChart(false)
//   }

//   function displayLinechart() {
//     setShowLineChart(true)
//     setShowBarChart(false)
//     setShowPieChart(false)
//   }

//   if (jobStatsLoading || currentUserLoading) {
//     return <Loader />;
//   }

//   if (!jobStats) {
//     return <NotFound />;
//   }

//   const { stats, monthlyApplications } = jobStats;

//   return (
//     <>
//       <div className="p-6 bg-gray-100 rounded-lg shadow-md">
//         {currentUser.role === 'admin'} ? (<AdminSubscription/>):
//         {currentUser.status === "recruiter" ? (
//           <>
//             <StatsContainer />
//             {monthlyApplications?.length > 0 && <ChartContainer />}
//           </>
//         ) : (
//           <>
//             <div className="mb-6">
//               <h1 className="text-center text-3xl font-bold italic">Acceptance rate of your resume </h1>
//             </div>
//             <div>
//               <StatsDisplay />
//             </div>
//             <div className="mt-8 mb-8 flex gap-6">
//               <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
//                 onClick={displayBarChart}>
//                 Bar Chart
//               </button>
//               <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                 onClick={displayLinechart}
//               >
//                 Line Chart
//               </button>
//               <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                 onClick={displayPieChart}
//               >
//                 Pie Chart
//               </button>
//             </div>
//             <div className="mb-8">
//               {
//                 showBarChart && <UserApplicationBarChart />
//               }
//             </div>
//             <div className="mb-8">
//               {
//                 showLineChart && <UserMontlyApplication />
//               }
//             </div>
//             <div className="mb-8">
//               {
//                 showPieChart && <MyApplicationStats />
//               }
//             </div>
//           </>
//         )}
//       </div>
//       <div>
//         <SubscriptionStatsPage/>
//       </div>
//     </>
//   );
// }



import { useState } from "react";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import StatsDisplay from "../features/dashboard/applicationStats/statsDisplay";
import UserApplicationBarChart from "../features/dashboard/applicationStats/useApplicationBarChart";
import UserMontlyApplication from "../features/dashboard/applicationStats/UsermontlyApplication";
import ChartContainer from "../features/stats/chartContainer";
import StatsContainer from "../features/stats/statsContainer";
import { useJobStats } from "../features/stats/useJobStats";
import Loader from "../ui/loader";
import NotFound from "../ui/notFound";
import MyApplicationStats from "../features/dashboard/applicationStats/myApplicationStats";
import SubscriptionStatsPage from "../features/subscription/userSubscriptionStats";
import AdminSubscription from "../features/subscription/adminSubscription";

export default function Stats() {
  const { jobStats, jobStatsLoading } = useJobStats();
  const { currentUser, currentUserLoading } = useCurrentUser();
  const [showBarChart, setShowBarChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);

  function displayPieChart() {
    setShowPieChart(true);
    setShowBarChart(false);
    setShowLineChart(false);
  }

  function displayBarChart() {
    setShowBarChart(true);
    setShowLineChart(false);
    setShowPieChart(false);
  }

  function displayLinechart() {
    setShowLineChart(true);
    setShowBarChart(false);
    setShowPieChart(false);
  }

  if (jobStatsLoading || currentUserLoading) {
    return <Loader />;
  }

  if (!jobStats) {
    return <NotFound />;
  }

  const { stats, monthlyApplications } = jobStats;

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        {currentUser.role === "admin" ? (
          <AdminSubscription />
        ) : currentUser.status === "recruiter" ? (
          <>
            <StatsContainer />
            {monthlyApplications?.length > 0 && <ChartContainer />}
          </>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-center text-3xl font-bold italic">
                Acceptance rate of your resume
              </h1>
            </div>
            <div>
              <StatsDisplay />
            </div>
            <div className="mt-8 mb-8 flex gap-6">
              <button
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={displayBarChart}
              >
                Bar Chart
              </button>
              <button
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={displayLinechart}
              >
                Line Chart
              </button>
              <button
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={displayPieChart}
              >
                Pie Chart
              </button>
            </div>
            <div className="mb-8">{showBarChart && <UserApplicationBarChart />}</div>
            <div className="mb-8">{showLineChart && <UserMontlyApplication />}</div>
            <div className="mb-8">{showPieChart && <MyApplicationStats />}</div>
          </>
        )}
      </div>
      <div>
        {currentUser.status !== 'recruiter' || currentUser.role === "admin" && <SubscriptionStatsPage /> }
        
      </div>
    </>
  );
}
