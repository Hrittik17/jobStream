import React from 'react'
import { useGetAllSubscriptions } from './useGetAllSubscriptions'
import Loader from '../../ui/loader'
import NotFound from '../../ui/notFound'

export default function TotalEarningBySubscription() {
    const { data, subscriptionLoading, subscriptionError, subscriptionRefetch } = useGetAllSubscriptions();

    if (subscriptionLoading) return <Loader />;
    if (subscriptionError) return <NotFound />;

    const totalEarnings = data?.totalEarnings || 0;

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
            <div className='flex justify-between'>

            <h2 className="text-2xl font-bold text-gray-800">Total Earnings</h2>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md mb-4' onClick={()=>subscriptionRefetch()}>Refresh</button>
            </div>
            <p className="text-3xl font-semibold text-blue-600 mt-2">
                ${Math.round(totalEarnings)}
            </p>
        </div>

        // <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl rounded-2xl p-6">
        //     {/* Light Glass Effect */}
        //     <div className="absolute inset-0 bg-white opacity-10 rounded-2xl"></div>

        //     <div className="relative z-10 flex justify-between items-center">
        //         <h2 className="text-xl font-semibold tracking-wide">Total Earnings</h2>
        //         <button
        //             className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
        //             onClick={() => subscriptionRefetch()}
        //         >
        //             Refresh
        //         </button>
        //     </div>

        //     <p className="relative z-10 text-4xl font-bold mt-4">
        //         ${Math.round(totalEarnings)}
        //     </p>
        // </div>

    );
}
