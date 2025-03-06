import React from 'react';
import { useGetAllSubscriptions } from './useGetAllSubscriptions';
import Loader from '../../ui/loader';
import NotFound from '../../ui/notFound';
// import { Button } from '@/components/ui/button';

export default function AdminSubscriptionList() {
    const { data, subscriptionLoading, subscriptionError, subscriptionRefetch } = useGetAllSubscriptions();

    if (subscriptionLoading) return <Loader />;
    if (subscriptionError) return <NotFound />;

    const AllSubscriptions = data?.allSubscriptions || [];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">All Subscriptions</h2>
                <button onClick={()=>subscriptionRefetch()} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Refresh
                </button>
            </div>

            {AllSubscriptions?.length === 0 ? (
                <p className="text-center text-gray-500">No subscriptions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left text-gray-600">User</th>
                                <th className="px-4 py-2 text-left text-gray-600">Email</th>
                                <th className="px-4 py-2 text-left text-gray-600">Plan</th>
                                <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AllSubscriptions?.map((sub) => (
                                <tr key={sub._id} className="border-t">
                                    <td className="px-4 py-2">{sub.subscribedBy?.fullName || 'N/A'}</td>
                                    <td className="px-4 py-2">{sub.subscribedBy?.email || 'N/A'}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                                            sub.subscriptionPlan === 'premium' ? 'bg-green-100 text-green-700' :
                                            sub.subscriptionPlan === 'standard' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {sub.subscriptionPlan}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-700">${sub.amount}</td>
                                    <td className="px-4 py-2 text-gray-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
