// import React from 'react';
// import { useGetRecruiterStats } from './usegetRecruiterStats';
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import NotFound from '../../ui/notFound';
// import Loader from '../../ui/loader';

// export default function RecruiterApplicationStats() {
//     const { RecruiterStats, recruiterStatsLoading, recruiterStatsError } = useGetRecruiterStats();

//     if (recruiterStatsLoading) return <Loader />;
//     if (recruiterStatsError) return <NotFound />;

//     console.log('recruiter stats:', RecruiterStats.totalResumes);
    
//     const { totalResumes, acceptedCount, rejectedCount, pendingCount } = RecruiterStats;
    
//     const acceptedStats = Math.ceil((acceptedCount / totalResumes) * 100);
//     const pendingStats = Math.ceil((pendingCount / totalResumes) * 100);
//     const rejectedStats = Math.ceil((rejectedCount / totalResumes) * 100);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-100 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Recruiter Application Stats</h2>
            
//             <div className="flex flex-wrap justify-between gap-6">
//                 {/* Progress Bars */}
//                 {[
//                     { label: "Total Resumes", value: totalResumes, count: totalResumes, color: "#3b82f6" },
//                     { label: "Accepted", value: acceptedStats, count: acceptedCount, color: "#16a34a" },
//                     { label: "On Hold", value: pendingStats, count: pendingCount, color: "#f59e0b" },
//                     { label: "Rejected", value: rejectedStats, count: rejectedCount, color: "#ef4444" }
//                 ].map(({ label, value, count, color }, index) => (
//                     <div key={index} className="flex flex-col items-center w-28">
//                         <h3 className="text-sm font-medium text-gray-800">{label}</h3>
//                         <p className="text-xs text-gray-500">Total: {count}</p>
//                         <div className="w-24 h-24 mt-2">
//                             <CircularProgressbar
//                                 value={value}
//                                 text={`${value}%`}
//                                 styles={buildStyles({
//                                     textColor: color,
//                                     pathColor: color,
//                                     trailColor: "#e5e7eb",
//                                 })}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


import React from 'react';
import { useGetRecruiterStats } from './usegetRecruiterStats';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import NotFound from '../../ui/notFound';
import Loader from '../../ui/loader';

export default function RecruiterApplicationStats() {
    const { RecruiterStats, recruiterStatsLoading, recruiterStatsError } = useGetRecruiterStats();

    if (recruiterStatsLoading) return <Loader />;
    if (recruiterStatsError) return <NotFound />;

    const { totalResumes, acceptedCount, rejectedCount, pendingCount } = RecruiterStats;
    const acceptedStats = Math.ceil((acceptedCount / totalResumes) * 100);
    const pendingStats = Math.ceil((pendingCount / totalResumes) * 100);
    const rejectedStats = Math.ceil((rejectedCount / totalResumes) * 100);

    return (
        <>
            <h1 className="italic text-center font-bold text-2xl mb-6">Recruiter Application Stats</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 bg-gray-100 rounded-lg shadow-md">
                {/* Total Resumes Card */}
                <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={100}
                            text={`${totalResumes}`}
                            styles={buildStyles({
                                textColor: "#3b82f6",
                                pathColor: "#3b82f6",
                                trailColor: "#dbeafe",
                            })}
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Total Resumes</h3>
                    <p className="text-sm text-gray-500">Total: {totalResumes}</p>
                </div>

                {/* Accepted Card */}
                <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={acceptedCount}
                            text={`${acceptedCount}%`}
                            styles={buildStyles({
                                textColor: "#16a34a",
                                pathColor: "#16a34a",
                                trailColor: "#d1fae5",
                            })}
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Accepted</h3>
                    <p className="text-sm text-gray-500">Total: {acceptedCount}</p>
                </div>

                {/* Pending Card */}
                <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={pendingCount}
                            text={`${pendingCount}%`}
                            styles={buildStyles({
                                textColor: "#eab308",
                                pathColor: "#eab308",
                                trailColor: "#fef9c3",
                            })}
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
                    <p className="text-sm text-gray-500">Total: {pendingCount}</p>
                </div>

                {/* Rejected Card */}
                <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={rejectedCount}
                            text={`${rejectedCount}%`}
                            styles={buildStyles({
                                textColor: "#dc2626",
                                pathColor: "#dc2626",
                                trailColor: "#fee2e2",
                            })}
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Rejected</h3>
                    <p className="text-sm text-gray-500">Total: {rejectedCount}</p>
                </div>
            </div>
        </>
    );
}