import JobApplicationStats from "./jobApplicationStats";
import { useAcceptApplication } from "./useAcceptApplication";
import { useAllJobApplications } from "./useAllApplications";

import { usePendingApplication } from './usePendingApplications'
import { useRejectApplication } from "./useRejectApplications";

export default function ApplicationsList({ applications }) {
    const { refetch } = useAllJobApplications()
    const { AcceptApplication, acceptLoading } = useAcceptApplication()
    const { pendingApplication, pendingLoading } = usePendingApplication()
    const { rejectApplication, rejectLoading } = useRejectApplication()

    // const {email,status} = currentUser
    // console.log(email,status)
    console.log(applications.userId)

    function accept(_id) {
        AcceptApplication({ _id, email: applications.userId.email }, {
            onSuccess:()=> refetch(),
            onError: (error) => {
                console.error(error.message)
            }
        })
    }

    function onHold(_id) {
        pendingApplication({ _id, email: applications.userId.email }, {
            onSuccess:()=> refetch(),
            onError: (error) => {
                console.error(error.message)
            }
        })
    }

    function reject(_id) {
        rejectApplication({ _id, email: applications.userId.email }, {
            onSuccess:()=> refetch(),
            onError: (error) => {
                console.error(error.message)
            }
        })
    }


    return (
        <div className="max-w-sm bg-white shadow-lg rounded-lg p-6 border border-gray-300 space-y-4">
            {/* Applicant Info */}
            <div>
                <img src={applications.userId.avatar} alt="" />
                <h2 className="text-xl font-semibold text-gray-800">{applications.userId.fullName}</h2>
                <p className="text-gray-600">{applications.userId.email}</p>
                <p className="text-gray-600">Gender: {applications.userId.gender}</p>
                <p className={`mt-2 text-lg font-medium ${getStatusStyle(applications.status)}`}>
                    Status: {applications.status}
                </p>
                <p className="mt-4">
                    <a
                        href={applications.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 transition duration-300"
                    >
                        View Resume
                    </a>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    Applied At: {new Date(applications.appliedAt).toLocaleString()}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4 justify-end">
                {applications.status === "Pending" && (
                    <>
                        <button
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => accept(`${applications._id}`)}
                            disabled={acceptLoading}
                        >
                            Accept
                        </button>
                        {/* <button
                            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => onHold(`${applications._id}`)}
                            disabled={pendingLoading}
                        >
                            Stall
                        </button> */}
                        <button
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => reject(`${applications._id}`)}
                            disabled={rejectLoading}
                        >
                            Reject
                        </button>
                    </>
                )}

                {applications.status === "Accepted" && (
                    <>
                        <button
                            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => onHold(`${applications._id}`)}
                            disabled={pendingLoading}
                        >
                            Stall
                        </button>
                        <button
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => reject(`${applications._id}`)}
                            disabled={rejectLoading}
                        >
                            Reject
                        </button>
                    </>
                )}

                {applications.status === "Rejected" && (
                    <p className="text-gray-500 italic">You have rejected this application</p>
                )}
            </div>
            {/* <JobApplicationStats /> */}
        </div>
    );
}

function getStatusStyle(status) {
    switch (status) {
        case "Accepted":
            return "text-green-600";
        case "Rejected":
            return "text-red-600";
        case "Pending":
        default:
            return "text-yellow-500";
    }
}



