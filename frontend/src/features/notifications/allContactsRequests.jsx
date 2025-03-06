import React, { useContext } from 'react'
import { useAllContactsRequests } from './useAllContactRequests'
import Loader from '../../ui/loader'
import NotFound from '../../ui/notFound'
import { useAcceptContactRequests } from './useAcceptContactRequests'
import { IoIosRefresh } from "react-icons/io";
import { SettingContext } from '../../context/settingContext'

export default function AllContactsRequestsList() {
    const {setIsNotificationOpen} = useContext(SettingContext)
    const { AllContactsRequests, allContactsRequestLoading, allContactsRequestsError, allContactsRequestsRefetch } = useAllContactsRequests()
    const { AcceptRequest, acceptRequestLoading } = useAcceptContactRequests()

    if (allContactsRequestLoading) return <Loader />
    if (allContactsRequestsError) return <NotFound />

    function acceptContactRequestsHandler(id){
        AcceptRequest(id,{
            onSuccess:()=>{
                allContactsRequestsRefetch()
                setIsNotificationOpen(false)
            } 
        })
    }

    console.log("All Contacts Requests : ", AllContactsRequests)
    return (
        <div className="p-3 w-64 bg-white shadow-lg rounded-md border border-gray-200">
            <div className='flex justify-between'>
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">Notifications</h2>
                <button onClick={() => allContactsRequestsRefetch}><IoIosRefresh size={20} /></button>
            </div>

            {AllContactsRequests?.length === 0 ? (
                <p className="text-gray-500 text-sm">No new notifications</p>
            ) : (
                <ul className="space-y-2">
                    {AllContactsRequests?.map((request) => (
                        <li key={request._id} className="p-2 border rounded-md shadow-sm bg-gray-100">
                            <p className="text-sm">
                                <strong>{request.senderId.fullName}</strong> sent a hire request for {request.serviceId.title}
                            </p>

                            <div className="mt-2 flex gap-2">
                                <button
                                    className="bg-green-500 text-white text-xs px-3 py-1 rounded-md hover:bg-green-600 transition"
                                    onClick={() => acceptContactRequestsHandler(request._id)}
                                    disabled={acceptRequestLoading}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600 transition"
                                    onClick={() => handleReject(request._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
