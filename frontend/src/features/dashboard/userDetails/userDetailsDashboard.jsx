// import { useNavigate } from "react-router-dom";
// import Loader from "../../../ui/loader";
// import { useCurrentUser } from "../../authentication/useCurrentUser";

// export default function UserDetailsDashboard() {
//     const navigate = useNavigate()
//     const { currentUser, currentUserLoading } = useCurrentUser();

//     if (currentUserLoading) {
//         return <Loader />;
//     }

//     const { fullName, email, gender, status, avatar } = currentUser;

//     return (
//         <div className="w-full max-w-3xl mx-auto p-8 bg-white bg-opacity-90 shadow-lg rounded-lg border border-gray-200">
//             <div className="flex justify-end">
//                 <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2 " onClick={()=>navigate('/profile')}>Update Profile</button>
//             </div>
//             <h2 className="text-2xl font-extrabold text-gray-800 mb-8 text-center">{fullName}'s Profile</h2>
//             <div className="flex flex-col items-center mb-8">
//                 <img
//                     src={avatar || "/default-avatar.png"}
//                     alt={`${fullName}'s avatar`}
//                     className="w-24 h-24 rounded-full shadow-md mb-4"
//                 />
//                 <span className="text-gray-500 italic">Welcome, {fullName.split(" ")[0]}!</span>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="flex items-center">
//                     <span className="font-semibold text-gray-600 w-28">Full Name:</span>
//                     <span className="text-gray-800">{fullName}</span>
//                 </div>
//                 <div className="flex items-center">
//                     <span className="font-semibold text-gray-600 w-28">Email:</span>
//                     <span className="text-gray-800">{email}</span>
//                 </div>
//                 <div className="flex items-center">
//                     <span className="font-semibold text-gray-600 w-28">Gender:</span>
//                     <span className="text-gray-800 capitalize">{gender}</span>
//                 </div>
//                 <div className="flex items-center">
//                     <span className="font-semibold text-gray-600 w-28">Status:</span>
//                     <span className="text-gray-800 capitalize">{status}</span>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useNavigate } from "react-router-dom";
import Loader from "../../../ui/loader";
import { useCurrentUser } from "../../authentication/useCurrentUser";

export default function UserDetailsDashboard() {
    const navigate = useNavigate();
    const { currentUser, currentUserLoading } = useCurrentUser();

    if (currentUserLoading) {
        return <Loader />;
    }

    const { fullName, email, gender, status, avatar } = currentUser;

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-lg rounded-lg border border-gray-300">
            {/* Profile Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                    {fullName}'s Profile
                </h2>
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    onClick={() => navigate("/profile")}
                >
                    Update Profile
                </button>
            </div>

            {/* Avatar and Welcome */}
            <div className="flex flex-col items-center mb-8">
                <img
                    src={avatar || "/default-avatar.png"}
                    alt={`${fullName}'s avatar`}
                    className="w-28 h-28 rounded-full shadow-md mb-4 border-4 border-white"
                />
                <span className="text-lg text-gray-500">
                    Welcome, <strong>{fullName.split(" ")[0]}</strong>!
                </span>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-32">Full Name:</span>
                    <span className="text-gray-800">{fullName}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-32">Email:</span>
                    <span className="text-gray-800">{email}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-32">Gender:</span>
                    <span className="text-gray-800 capitalize">{gender}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold text-gray-600 w-32">Status:</span>
                    <span className="text-gray-800 capitalize">{status}</span>
                </div>
            </div>
        </div>
    );
}
