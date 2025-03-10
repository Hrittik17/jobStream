// import { useNavigate } from "react-router-dom";
// import day from "dayjs";
// import advancedFormat from "dayjs/plugin/advancedFormat";

// day.extend(advancedFormat);

// export default function JobsLayout({ allJob }) {
//     const navigate = useNavigate();

//     // Destructuring with fallback values
//     const {
//         positionTitle = "Unknown Position",
//         companyName = "Unknown Company",
//         seniorityLevel = "N/A",
//         employmentType = "N/A",
//         workMode = "N/A",
//         location = "N/A",
//         description = "No description available",
//         package: jobPackage = "Not Disclosed",
//         candidateQuota = "N/A",
//         applicationStatus = "Unknown",
//         _id,
//         createdAt,
//     } = allJob;

//     // Helper function for dynamic status colors
//     const getStatusStyles = (applicationStatus) => {
//         switch (applicationStatus) {
//             case "Pending":
//                 return "bg-yellow-300 text-yellow-800";
//             case "Accepted":
//                 return "bg-green-300 text-green-800";
//             default:
//                 return "bg-gray-300 text-gray-800";
//         }
//     };

//     return (
//         <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6 md:max-w-md lg:max-w-lg transition-transform hover:scale-105">
//             <div className="p-6">
//                 {/* Job Title and Company Name */}
//                 <h2 className="text-xl font-bold text-gray-800 truncate" title={positionTitle}>
//                     {positionTitle}
//                 </h2>
//                 <p className="text-gray-500 mt-1 truncate" title={companyName}>
//                     {companyName}
//                 </p>

//                 {/* Employment Details */}
//                 <p className="text-sm text-gray-400 mt-2">
//                     {seniorityLevel} - {employmentType}
//                 </p>
//                 <p className="text-sm text-gray-400 mt-1">
//                     {workMode} | {location}
//                 </p>

//                 {/* Date Posted */}
//                 {createdAt && (
//                     <p className="text-sm text-gray-400 mt-2">
//                         Posted on: {day(createdAt).format("MMMM D, YYYY")}
//                     </p>
//                 )}

//                 {/* Description */}
//                 <p className="text-sm text-gray-600 mt-4 line-clamp-3" title="Click to view more">
//                     {description}
//                 </p>

//                 {/* Salary & Package */}
//                 <div className="mt-4 text-sm font-medium text-gray-800">
//                     <span className="font-semibold">Package:</span> ${jobPackage}
//                 </div>

//                 {/* Candidate Quota & Application Status */}
//                 <div className="mt-4 flex justify-between items-center">
//                     <span className="text-sm text-gray-500">Candidates: {candidateQuota}</span>
//                     <span
//                         className={`text-sm px-2 py-1 rounded-full ${getStatusStyles(applicationStatus)}`}
//                     >
//                         {applicationStatus}
//                     </span>
//                 </div>

//                 {/* Apply Button */}
//                 <div className="flex gap-4 justify-between">
//                     <button className="border-none rounded-md font-medium text-sm flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300" onClick={()=>navigate(`${_id}/all-applications`)}>View All Applications</button>

//                     <button
//                         className="border-none rounded-md font-medium text-sm flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
//                         onClick={() => navigate(`/my-jobs/${_id}`)}
//                         aria-label={`Apply for ${positionTitle}`}
//                     >
//                         Edit Job Details
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );

// }

import { useNavigate } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

day.extend(advancedFormat);

export default function JobsLayout({ allJob }) {
    const navigate = useNavigate();

    // Destructuring with fallback values
    const {
        positionTitle = "Unknown Position",
        companyName = "Unknown Company",
        seniorityLevel = "N/A",
        employmentType = "N/A",
        workMode = "N/A",
        location = "N/A",
        description = "No description available",
        package: jobPackage = "Not Disclosed",
        candidateQuota = "N/A",
        applicationStatus = "Unknown",
        _id,
        createdAt,
    } = allJob;

    // Helper function for dynamic status colors
    const getStatusStyles = (applicationStatus) => {
        switch (applicationStatus) {
            case "Pending":
                return "bg-yellow-300 text-yellow-800";
            case "Accepted":
                return "bg-green-300 text-green-800";
            default:
                return "bg-gray-300 text-gray-800";
        }
    };

    return (
        <>
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6 md:max-w-lg lg:max-w-xl transition-transform hover:scale-105">

                <div className="p-6">
                    {/* Job Title and Company Name */}
                    <h2 className="text-xl font-bold text-gray-800 truncate" title={positionTitle}>
                        {positionTitle}
                    </h2>
                    <p className="text-gray-500 mt-1 truncate" title={companyName}>
                        {companyName}
                    </p>

                    {/* Employment Details */}
                    <p className="text-sm text-gray-400 mt-2">
                        {seniorityLevel} - {employmentType}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        {workMode} | {location}
                    </p>

                    {/* Date Posted */}
                    {createdAt && (
                        <p className="text-sm text-gray-400 mt-2">
                            Posted on: {day(createdAt).format("MMMM D, YYYY")}
                        </p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-gray-600 mt-4 line-clamp-3" title="Click to view more">
                        {description}
                    </p>

                    {/* Salary & Package */}
                    <div className="mt-4 text-sm font-medium text-gray-800">
                        <span className="font-semibold">Package:</span> ${jobPackage}
                    </div>

                    {/* Candidate Quota & Application Status */}
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">Candidates: {candidateQuota}</span>
                        <span
                            className={`text-sm px-2 py-1 rounded-full ${getStatusStyles(applicationStatus)}`}
                        >
                            {applicationStatus}
                        </span>
                    </div>

                    {/* Buttons Section */}  
                    <div className="mt-6 flex gap-4 justify-between">
                        <button
                            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                            onClick={() => navigate(`${_id}/all-applications`)}
                        >
                            View All Applications
                        </button>

                        <button
                            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => navigate(`/my-jobs/${_id}`)}
                            aria-label={`Apply for ${positionTitle}`}
                        >
                            Edit Job
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


// navigate(`${_id}/all-applications`)