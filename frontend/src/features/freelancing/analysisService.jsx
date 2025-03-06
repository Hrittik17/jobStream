// import { useParams } from "react-router-dom"
// import { useServiceDetails } from "./useServiceDetails"
// import Loader from "../../ui/loader"
// import BackButton from "../../ui/backButton"
// import { useEffect } from "react"
// import { useCurrentUser } from "../authentication/useCurrentUser"
// import { useIncrementViews } from "./useIncreamentViews"

// export default function AnalysisService() {
//     const {id} = useParams()
//     const {currentUser,currentUserLoading} = useCurrentUser()
//     const { serviceDetails, serviceDetailsLoading } = useServiceDetails()
//     const {incrementViews} = useIncrementViews()

//     useEffect(() => {
//         let hasIncremented = false; // Flag to prevent multiple calls
//         if (!serviceDetailsLoading && !currentUserLoading &&!hasIncremented) {
//             // Prevent the owner from incrementing their own views
//             if (currentUser._id !== serviceDetails.userId) {
//                 incrementViews(id); // Trigger React Query mutation
//                 hasIncremented = true; // Set flag after the first increment
//             }
//         }
//     }, [currentUser, serviceDetails, serviceDetailsLoading, currentUserLoading, incrementViews,id]);

//     if (serviceDetailsLoading || currentUserLoading) {
//         return <Loader />
//     }

//     console.log(currentUser)
//     console.log(serviceDetails)
//     const {
//         category,
//         createdAt,
//         description,
//         views,
//         projectLink,
//         servicesAmount,
//         title,
//         userId,
//     } = serviceDetails;

   
//     return (
//         <>
//             <BackButton />
//             <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Analysis</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Service Details */}
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-700">Service Details</h3>
//                         <p className="text-sm text-gray-600"><strong>Title:</strong> {title}</p>
//                         <p className="text-sm text-gray-600"><strong>Category:</strong> {category}</p>
//                         <p className="text-sm text-gray-600"><strong>Description:</strong> {description}</p>
//                         <p className="text-sm text-gray-600"><strong>Views:</strong> {views}</p>
//                         <p className="text-sm text-gray-600"><strong>Services Amount:</strong> ${servicesAmount}</p>
//                         <p className="text-sm text-gray-600">
//                             <strong>Project Link:</strong>{" "}
//                             <a
//                                 href={projectLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:underline"
//                             >
//                                 Visit Project
//                             </a>
//                         </p>
//                     </div>

//                     {/* User Details */}
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-700">User Details</h3>
//                         <p className="text-sm text-gray-600"><strong>Name:</strong> {userId.fullName}</p>
//                         <p className="text-sm text-gray-600"><strong>Email:</strong> {userId.email}</p>
//                         <p className="text-sm text-gray-600"><strong>Gender:</strong> {userId.gender}</p>
//                         <p className="text-sm text-gray-600"><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
//                     </div>
//                 </div>
//                 <div className="my-8 flex justify-end">
//                     <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Hire</button>
//                 </div>
//             </div>
//         </>
//     )
// }



// import { useParams } from "react-router-dom";
// import { useServiceDetails } from "./useServiceDetails";
// import Loader from "../../ui/loader";
// import BackButton from "../../ui/backButton";
// import { useEffect } from "react";
// import { useCurrentUser } from "../authentication/useCurrentUser";
// import { useIncrementViews } from "./useIncreamentViews";

// export default function AnalysisService() {
//     const { id } = useParams();
//     const { currentUser, currentUserLoading } = useCurrentUser();
//     const { serviceDetails, serviceDetailsLoading } = useServiceDetails();
//     const { incrementViews } = useIncrementViews();

//     useEffect(() => {
//         let hasIncremented = false;
//         if (!serviceDetailsLoading && !currentUserLoading && !hasIncremented) {
//             if (currentUser._id !== serviceDetails.userId) {
//                 incrementViews(id);
//                 hasIncremented = true;
//             }
//         }
//     }, [currentUser, serviceDetails, serviceDetailsLoading, currentUserLoading, incrementViews, id]);

//     if (serviceDetailsLoading || currentUserLoading) {
//         return <Loader />;
//     }

//     const {
//         category,
//         createdAt,
//         description,
//         views,
//         projectLink,
//         servicesAmount,
//         title,
//         userId,
//     } = serviceDetails;

//     return (
//         <>
//             <BackButton />
//             <div className="max-w-5xl mx-auto my-8 p-8 bg-white shadow-xl rounded-xl border border-gray-300">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">📊 Service Analysis</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
//                         <h3 className="text-xl font-semibold text-gray-800 mb-4">🔍 Service Details</h3>
//                         <p className="text-sm text-gray-700"><strong>📌 Title:</strong> {title}</p>
//                         <p className="text-sm text-gray-700"><strong>📂 Category:</strong> {category}</p>
//                         <p className="text-sm text-gray-700"><strong>📝 Description:</strong> {description}</p>
//                         <p className="text-sm text-gray-700"><strong>👀 Views:</strong> {views}</p>
//                         <p className="text-sm text-gray-700"><strong>💰 Services Amount:</strong> ${servicesAmount}</p>
//                         <p className="text-sm text-gray-700">
//                             <strong>🔗 Project Link:</strong>{" "}
//                             <a
//                                 href={projectLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 font-semibold hover:underline"
//                             >
//                                 Visit Project 🚀
//                             </a>
//                         </p>
//                     </div>
//                     <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
//                         <h3 className="text-xl font-semibold text-gray-800 mb-4">👤 User Details</h3>
//                         <div className="flex items-center gap-4 mb-4">
//                             <img
//                                 src={userId.avatar || "/default_user.jpg"}
//                                 alt="User Avatar"
//                                 className="w-14 h-14 rounded-full shadow-md"
//                             />
//                             <div>
//                                 <p className="text-lg font-semibold text-gray-900">{userId.fullName}</p>
//                                 <p className="text-sm text-gray-600">{userId.email}</p>
//                             </div>
//                         </div>
//                         <p className="text-sm text-gray-700"><strong>⚧ Gender:</strong> {userId.gender}</p>
//                         <p className="text-sm text-gray-700"><strong>📅 Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
//                     </div>
//                 </div>
//                 <div className="mt-8 flex justify-center">
//                     <button className="text-white bg-gradient-to-r from-green-500 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-semibold rounded-lg text-md px-6 py-3 transition duration-300">
//                         🚀 Hire Now
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }





import { useState } from "react";
import { useParams } from "react-router-dom";
import { useServiceDetails } from "./useServiceDetails";
import Loader from "../../ui/loader";
import BackButton from "../../ui/backButton";
import { useEffect } from "react";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useIncrementViews } from "./useIncreamentViews";
import HireModal from "./hireModal"; // Import the modal
import { useInviteContactRequests } from "./useInviteContactRequests";

export default function AnalysisService() {
    const { id } = useParams();
    const { currentUser, currentUserLoading } = useCurrentUser();
    const { serviceDetails, serviceDetailsLoading } = useServiceDetails();
    const {SendContactRequests,sendContactRequestsLoading,sendContactRequestsError} = useInviteContactRequests()
    const { incrementViews } = useIncrementViews();
    
    const [isHireModalOpen, setHireModalOpen] = useState(false); // Modal State

    useEffect(() => {
        let hasIncremented = false;
        if (!serviceDetailsLoading && !currentUserLoading && !hasIncremented) {
            if (currentUser._id !== serviceDetails.userId) {
                incrementViews(id);
                hasIncremented = true;
            }
        }
    }, [currentUser, serviceDetails, serviceDetailsLoading, currentUserLoading, incrementViews, id]);

    if (serviceDetailsLoading || currentUserLoading) {
        return <Loader />;
    }

    const {
        _id,
        category,
        createdAt,
        description,
        views,
        projectLink,
        servicesAmount,
        title,
        userId,
    } = serviceDetails;

    return (
        <>
            <BackButton />
            <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Service Details</h3>
                        <p className="text-sm text-gray-600"><strong>Title:</strong> {title}</p>
                        <p className="text-sm text-gray-600"><strong>Category:</strong> {category}</p>
                        <p className="text-sm text-gray-600"><strong>Description:</strong> {description}</p>
                        <p className="text-sm text-gray-600"><strong>Views:</strong> {views}</p>
                        <p className="text-sm text-gray-600"><strong>Services Amount:</strong> ${servicesAmount}</p>
                        <p className="text-sm text-gray-600">
                            <strong>Project Link:</strong>{" "}
                            <a href={projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Visit Project
                            </a>
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">User Details</h3>
                        <p className="text-sm text-gray-600"><strong>Name:</strong> {userId.fullName}</p>
                        <p className="text-sm text-gray-600"><strong>Email:</strong> {userId.email}</p>
                        <p className="text-sm text-gray-600"><strong>Gender:</strong> {userId.gender}</p>
                        <p className="text-sm text-gray-600"><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="my-8 flex justify-end">
                    <button 
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => SendContactRequests({ friendEmail: userId.email, serviceId: _id })}
                    >
                        Hire
                    </button>
                </div>
            </div>
        </>
    );
}
