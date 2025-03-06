import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteServices } from './useDeleteServices';

export default function UserServiceCard({ service }) {
    const navigate = useNavigate()
    const {_id, skills, description, title, views, servicesAmount, projectLink, createdAt, userId } = service;
    const id = _id
    const avatar = userId?.avatar; // Access the avatar field from the userId object
    const fullName = userId?.fullName; // Access the fullName field from the userId object
    const {deleteUserServices,deleteServicesLoading} = useDeleteServices()

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-4">
            <div className="p-4">
                <div className="flex items-center space-x-4">
                    {avatar ? (
                        <img 
                            src={avatar || 'default_user.jpg'} 
                            alt="User Avatar" 
                            className="w-12 h-12 rounded-full object-cover" 
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-white text-lg">?</span>
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-600">{skills}</p>
                        {fullName && (
                            <p className="text-sm text-gray-500 mt-1">{fullName}</p> // Display the user's full name
                        )}
                    </div>
                </div>
                <p className="text-gray-700 mt-2">{description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-500 text-sm">{`Views: ${views}`}</span>
                    <span className="text-gray-500 text-sm">{`Services: ${servicesAmount}`}</span>
                </div>
                <div className="mt-4 flex justify-between">
                    <a href={projectLink} className="text-blue-500 text-sm" target="_blank" rel="noopener noreferrer">
                        Project Link
                    </a>
                    <span className="text-gray-400 text-xs">{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <div className='my-8 flex justify-end gap-6'>
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={()=>navigate(`/my-services/${id}`)}>Edit services</button>
                    <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    disabled={deleteServicesLoading}
                    onClick={()=>deleteUserServices(id)}>Delete services</button>
                </div>
            </div>
        </div>

    );
}
