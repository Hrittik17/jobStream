import React from 'react'
import { useGetUserSubscription } from './useUserSubscription'
import Loader from "../../ui/loader"
import BackButton from '../../ui/backButton'

export default function MySubscription() {
    const { subscriptions, subscriptionLoading, subscriptionRefetch } = useGetUserSubscription()
    if (subscriptionLoading) return <Loader />

    if (!subscriptions || subscriptions.length === 0) {
        return <p className="text-gray-600 text-center mt-4">You have no active subscriptions.</p>;
    }
    console.log(subscriptions)
    return (
        <>
            <BackButton />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold text-center mb-6">My Subscriptions</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subscriptions.map((subscription) => (
                        <div
                            key={subscription._id}
                            className="bg-white shadow rounded-lg p-6 border border-gray-200"
                        >
                            <h2 className="text-xl font-bold">{subscription.subscriptionPlan}</h2>
                            <p className="text-gray-600">Amount: ${subscription.amount}</p>
                            <p className="text-gray-600">
                                Subscribed On: {new Date(subscription.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
