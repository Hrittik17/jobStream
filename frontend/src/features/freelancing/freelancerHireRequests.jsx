import Loader from "../../ui/loader";
import NotFound from "../../ui/notFound";
import { useGetHireFreelancers } from "./useGetHireFreelancers";
import { useUpdateHireFreelancersStatus } from "./useUpdateHireFreelancersStatus";

export default function FreelancerHireRequests() {
    const { FreelancerHireRequests,freelancerHireRequestsLoading,freelancerHireRequestsError,freelancerHireRequestsRefetch} = useGetHireFreelancers();
    const { updateStatus,updateStatusLoading } = useUpdateHireFreelancersStatus();

    if (freelancerHireRequestsLoading) return <Loader/>
    if (freelancerHireRequestsError) return <NotFound/>

    console.log('freelancer :',FreelancerHireRequests)

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Hire Requests</h2>
            {FreelancerHireRequests.length === 0 ? (
                <p>No hire requests.</p>
            ) : (
                <ul>
                    {FreelancerHireRequests.map((request) => (
                        <li key={request._id} className="p-3 border-b">
                            <p><strong>Service:</strong> {request.serviceId.title}</p>
                            <p><strong>Client:</strong> {request.clientId.fullName}</p>
                            <p><strong>Status:</strong> {request.status}</p>

                            {request.status === "Pending" && (
                                <div className="flex space-x-3 mt-2">
                                    <button
                                        onClick={() => updateStatus({ requestId: request._id, status: "Accepted" })}
                                        className="px-3 py-1 bg-green-500 text-white rounded"
                                        disabled={updateStatusLoading}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus({ requestId: request._id, status: "Rejected" })}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                        disabled={updateStatusLoading}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
