// import React from 'react'
// import { useUserServices } from './useUserServices'
// import Loader from '../../ui/loader'
// import UserServiceCard from './userServiceCard'

// export default function AllUserServices() {
//     const {userServices,userServicesLoading} = useUserServices()
//     if(userServicesLoading) return <Loader/>
//     console.log(userServices)
//   return (
//     <div>
//       {
//         userServices.map((userService)=>{
//             return (
//                 <UserServiceCard key={userService._id} service={userService}/>
//             )
//         })
//       }
//     </div>
//   )
// }




import React, { useState } from 'react';
import { useUserServices } from './useUserServices';
import Loader from '../../ui/loader';
import UserServiceCard from './userServiceCard';

export default function AllUserServices() {
  const { userServices, userServicesLoading } = useUserServices();
  const [searchQuery, setSearchQuery] = useState('');

  if (userServicesLoading) return <Loader />;

  // Filter services based on search query
  const filteredServices = userServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Horizontal Scrollable Services */}
      <div className="flex overflow-x-auto space-x-4 p-2 scrollbar-hide">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <UserServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No services found.</p>
        )}
      </div>
    </div>
  );
}
