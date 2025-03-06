import React from 'react'
import AdminSubscriptionList from './adminSubscriptionList'
import AdminSubscriptionChart from './adminSubscriptionStats'
import TotalEarningBySubcription from './totalEarningBySubcription'
import BackButton from '../../ui/backButton'

export default function AdminSubscription() {
    return (
        <>
        <BackButton/>
            <div className='mt-4 mb-6'>
                <TotalEarningBySubcription />
            </div>
            <div>
                <AdminSubscriptionList />
            </div>
            <div>
                <AdminSubscriptionChart />
            </div>
        </>

    )
}
