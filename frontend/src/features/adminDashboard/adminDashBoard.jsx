import React from 'react'
import TotalEarningBySubscription from '../subscription/totalEarningBySubcription'
import { useGetAllSubscriptions } from '../subscription/useGetAllSubscriptions'
import Loader from '../../ui/loader'
import NotFound from '../../ui/notFound'
import DashboardCalendar from '../dashboard/dashboardCalender'
import AdminStats from '../admin/adminStats'
import UserDetailsDashboard from '../dashboard/userDetails/userDetailsDashboard'

export default function AdminDashBoard() {
    const { data, subscriptionLoading, subscriptionRefetch, subscriptionError } = useGetAllSubscriptions()

    if (subscriptionLoading) return <Loader />
    if (subscriptionError) return <NotFound />
    const totalNumberOfSubscriptions = data?.allSubscriptions.length

    return (
        <>
           <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Earnings Section */}
                <div className="col-span-1 lg:col-span-2">
                    <TotalEarningBySubscription />
                </div>

                {/* Total Subscriptions Count */}
                <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-600">Total Subscriptions</h2>
                    <p className="text-4xl font-bold text-blue-600 mt-2">{totalNumberOfSubscriptions}</p>
                </div>
            </div>
            
            {/* User & Calendar Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <UserDetailsDashboard />
                <DashboardCalendar />
            </div>

            {/* Admin Stats */}
            <div className="mt-6">
                <AdminStats />
            </div>
        </div>
        </>
    )
}
