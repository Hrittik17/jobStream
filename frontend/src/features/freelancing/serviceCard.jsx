// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function ServiceCard({ service }) {
//     const navigate = useNavigate()
//     const {_id, skills, description, title, views, servicesAmount, projectLink, createdAt, userId } = service;
//     const id = _id
//     const avatar = userId?.avatar; // Access the avatar field from the userId object
//     const fullName = userId?.fullName; // Access the fullName field from the userId object

//     return (
//         <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-4">
//             <div className="p-4">
//                 <div className="flex items-center space-x-4">
//                     {avatar ? (
//                         <img 
//                             src={avatar || 'default_user.jpg'} 
//                             alt="User Avatar" 
//                             className="w-12 h-12 rounded-full object-cover" 
//                         />
//                     ) : (
//                         <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
//                             <span className="text-white text-lg">?</span>
//                         </div>
//                     )}
//                     <div>
//                         <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//                         <p className="text-sm text-gray-600">{skills}</p>
//                         {fullName && (
//                             <p className="text-sm text-gray-500 mt-1">{fullName}</p> // Display the user's full name
//                         )}
//                     </div>
//                 </div>
//                 <p className="text-gray-700 mt-2">{description}</p>
//                 <div className="flex justify-between items-center mt-4">
//                     <span className="text-gray-500 text-sm">{`Views: ${views}`}</span>
//                     <span className="text-gray-500 text-sm">{`Services: ${servicesAmount}`}</span>
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                     <a href={projectLink} className="text-blue-500 text-sm" target="_blank" rel="noopener noreferrer">
//                         Project Link
//                     </a>
//                     <span className="text-gray-400 text-xs">{new Date(createdAt).toLocaleDateString()}</span>
//                 </div>
//                 <div className='my-8 flex justify-end gap-6'>
//                     <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
//                     onClick={()=>navigate(`${id}`)}>Analysis</button>
//                     <button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Hire</button>
//                 </div>
//             </div>
//         </div>

//     );
// }

// // export default ServiceCard;


import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service }) {
    const navigate = useNavigate();
    const { _id, skills, description, title, views, servicesAmount, projectLink, createdAt, userId } = service;

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
            <div className="p-5">
                {/* User Profile */}
                <div className="flex items-center gap-4">
                    <img 
                        src={userId?.avatar || "/default_user.jpg"} 
                        alt="User Avatar" 
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{userId?.fullName || "Unknown User"}</h3>
                        <h3 className="text-sm font-italic text-gray-900">{userId?.email || "Unknown User"}</h3>
                        <p className="text-sm text-gray-500">{skills}</p>
                    </div>
                </div>

                {/* Service Info */}
                <h2 className="mt-4 text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2 text-sm">{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>

                {/* Stats */}
                <div className="mt-4 flex justify-between text-gray-500 text-sm">
                    <span>👀 {views} Views</span>
                    <span>📌 ${servicesAmount}</span>
                </div>

                {/* Actions */}
                <div className="mt-5 flex justify-between items-center">
                    <a href={projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline">
                        View Project
                    </a>
                    <span className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString()}</span>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                    <button 
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                        onClick={() => navigate(`${_id}`)}
                    >
                        View Details
                    </button>
                    <button 
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
}
