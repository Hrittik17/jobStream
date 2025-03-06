import Loader from "../../ui/loader";
import NotFound from "../../ui/notFound";
import { useGetClientAllRequests } from "../profile/useGetClientAllRequests";
import { useGetAllClientServices } from "./useGetAllClientServices";

export default function ClientHireRequests() {
    // const { ClientServicesRequests, clientServicesRequestsLoading, clientServicesRequestsError, clientServicesRequestsRefetch } = useGetAllClientServices();
    const {ClientRequests,clientRequestsLoading,clientRequestsError,clientRequestsRefetch} = useGetClientAllRequests()

    if (clientRequestsLoading) return <Loader />
    if (clientRequestsError) return <NotFound />;

    console.log('client requests :',ClientRequests)

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hire Requests Sent</h2>

            {ClientRequests.length === 0 ? (
                <p className="text-gray-500 text-center">No hire requests found.</p>
            ) : (
                <div className="space-y-4">
                    {ClientRequests.map((request) => (
                        <div key={request._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                            {/* Service Details */}
                            <h3 className="text-lg font-bold text-gray-900">{request.serviceId.title}</h3>
                            <p className="text-gray-600">Skills: {request.serviceId.skills}</p>
                            <p className="text-gray-800 font-medium">₹{request.serviceId.servicesAmount}</p>

                            {/* Receiver (Freelancer) Details */}
                            <div className="mt-3">
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">Freelancer:</span> {request.receiverId.fullName}
                                </p>
                                <p className="text-sm text-gray-600">{request.receiverId.email}</p>
                            </div>

                            {/* Status */}
                            <div className="mt-3">
                                <span
                                    className={`px-3 py-1 text-sm font-medium rounded-full 
                                    ${request.status === "pending" ? "bg-yellow-200 text-yellow-800" : ""}
                                    ${request.status === "accepted" ? "bg-green-200 text-green-800" : ""}
                                    ${request.status === "rejected" ? "bg-red-200 text-red-800" : ""}`}
                                >
                                    {request.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}