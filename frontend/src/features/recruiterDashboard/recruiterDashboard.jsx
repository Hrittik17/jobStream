// import React from 'react';
// import DashboardCalendar from '../dashboard/dashboardCalender';
// import UserDetailsDashboard from '../dashboard/userDetails/userDetailsDashboard';
// import MyJobs from '../editJobs/myJobs';
// import DashBoardUsersApplications from './dashBoardUsersApplications';
// import RecruiterApplicationStats from './recruiterApplicationStats';

// export default function RecruiterDashboard() {
//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-semibold text-gray-800 mb-6">Recruiter Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="bg-white shadow-lg rounded-lg p-6">
//                     <RecruiterApplicationStats />
//                 </div>

//                 {/* Calendar Section */}
//                 <div className="bg-white shadow-lg rounded-lg p-6">
//                     <h2 className="text-lg font-medium text-gray-700 mb-4">Calendar</h2>
//                     <DashboardCalendar />
//                 </div>


//                 {/* User Details Section */}
//                 <div className="bg-white shadow-lg rounded-lg p-6">
//                     <h2 className="text-lg font-medium text-gray-700 mb-4">Recruiter Details</h2>
//                     <UserDetailsDashboard />
//                 </div>

//                 {/* Job Applications Section */}
//                 <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
//                     <h2 className="text-lg font-medium text-gray-700 mb-4">Applications Overview</h2>
//                     <DashBoardUsersApplications />
//                 </div>

//                 {/* My Jobs Section */}
//                 {/* <div className="lg:col-span-3 bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-lg font-medium text-gray-700 mb-4">My Posted Jobs</h2>
//           <MyJobs />
//         </div> */}
//             </div>
//         </div>
//     );
// }



import React from 'react';
import DashboardCalendar from '../dashboard/dashboardCalender';
import UserDetailsDashboard from '../dashboard/userDetails/userDetailsDashboard';
import MyJobs from '../editJobs/myJobs';
import DashBoardUsersApplications from './dashBoardUsersApplications';
import RecruiterApplicationStats from './recruiterApplicationStats';
import RecruiterStats from './recruiterStats';
import AllResumesCount from './allResumesCount';
import FreelancerHireRequests from '../freelancing/freelancerHireRequests';

export default function RecruiterDashboard() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Recruiter Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Recruiter Application Stats */}
                <div className="lg:col-span-3 bg-white shadow-lg rounded-lg p-6">
                    <RecruiterApplicationStats />
                </div>

                {/* Calendar Section */}
                <div className='flex gap-6'>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Calendar</h2>
                        <DashboardCalendar />
                    </div>

                    <div>
                        <AllResumesCount />
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <RecruiterStats />
                </div>

                {/* User Details Section */}
                {/* <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recruiter Details</h2>
                    <UserDetailsDashboard />
                </div> */}

                {/* Applications Overview */}
                <div className="lg:col-span-3 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Applications Overview</h2>
                    <DashBoardUsersApplications />
                </div>

                <div>
                    <FreelancerHireRequests/>
                </div>

            </div>
        </div>
    );
}
