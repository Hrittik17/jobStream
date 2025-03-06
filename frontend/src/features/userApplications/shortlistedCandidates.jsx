// import { useParams } from "react-router-dom"
// import Loader from "../../ui/loader"
// import { useAllShortlistedCandidates } from "./useAllShortlistedCandidated"


// export default function ShortListedCandidates() {
//     const {id} = useParams()
//     const {shortlisted,shortlistedLoading,shortlistedRefetch} = useAllShortlistedCandidates()

//     if (shortlistedLoading) return <Loader/>

//     console.log(shortlisted)
//   return (
//     <div>
//         <div>
//             <h1>Accepted Applications for Job ID: {shortlisted.jobId}</h1>
//             <ul>
//                 {shortlisted?.map((shortlist) => (
//                     <li key={shortlist._id}>
//                         <p><strong>Name:</strong> {shortlist.userId.fullName}</p>
//                         <p><strong>Email:</strong> {shortlist.userId.email}</p>
//                         <p>
//                             <strong>Resume:</strong>{" "}
//                             <a href={shortlist.resume} target="_blank" rel="noopener noreferrer">
//                                 View Resume
//                             </a>
//                         </p>
//                         <p><strong>Applied At:</strong> {new Date(shortlist.appliedAt).toLocaleDateString()}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>

//     </div>
//   )
// }


// import { useParams } from "react-router-dom";
// import Loader from "../../ui/loader";
// import { useAllShortlistedCandidates } from "./useAllShortlistedCandidated";

// export default function ShortListedCandidates() {
//     const { id } = useParams();
//     const { shortlisted, shortlistedLoading } = useAllShortlistedCandidates();

//     if (shortlistedLoading) return <Loader />;

//     return (
//         <div className="max-w-7xl mx-auto p-6">
//             <div className="bg-white shadow-md rounded-lg p-6">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-4">
//                     Accepted Applications for Job ID: {id}
//                 </h1>

//                 {shortlisted?.length === 0 ? (
//                     <p className="text-gray-600">No accepted applications found for this job.</p>
//                 ) : (
//                     <ul className="space-y-6">
//                         {shortlisted.map((shortlist) => (
//                             <li
//                                 key={shortlist._id}
//                                 className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-50"
//                             >
//                                 <p className="text-lg font-medium text-gray-800">
//                                     <strong>Name:</strong> {shortlist.userId.fullName}
//                                 </p>
//                                 <p className="text-gray-700">
//                                     <strong>Email:</strong> {shortlist.userId.email}
//                                 </p>
//                                 <p className="text-blue-600 hover:underline">
//                                     <strong>Resume:</strong>{" "}
//                                     <a
//                                         href={shortlist.resume}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         View Resume
//                                     </a>
//                                 </p>
//                                 <p className="text-gray-600">
//                                     <strong>Applied At:</strong>{" "}
//                                     {new Date(shortlist.appliedAt).toLocaleDateString()}
//                                 </p>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// }


import { useParams } from "react-router-dom";
import Loader from "../../ui/loader";
import { useAllShortlistedCandidates } from "./useAllShortlistedCandidated";
import "react-datepicker/dist/react-datepicker.css"; // Import React Date Picker styles
import CandidateCard from "./cardCandidate";
import BackButton from "../../ui/backButton";


export default function ShortListedCandidates() {
    const { id } = useParams();
    const { shortlisted, shortlistedLoading } = useAllShortlistedCandidates();

    // Handle loading state
    if (shortlistedLoading) return <Loader />;

    return (
        <>
            <div>
                <BackButton/>
            </div>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center italic">
                    Shortlisted Candidates for Job ID: {id}
                </h1>

                {shortlisted?.length === 0 ? (
                    <p className="text-gray-600 text-center">
                        No shortlisted candidates found for this job.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shortlisted.map((candidate) => (
                            <CandidateCard
                                key={candidate._id}
                                candidate={candidate}
                                jobId={id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

