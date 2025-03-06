import React from 'react';
import { useGetAllApplicationUserDetails } from './useGetAllApplicationUserDetails';
import Loader from '../../ui/loader';
import NotFound from '../../ui/notFound';
import { Link } from 'react-router-dom';

export default function DashBoardUsersApplications() {
    const { DashBoardApplications, dashBoardApplicationsLoading, dashBoardApplicationsError, dashBoardApplicationsRefetch } = useGetAllApplicationUserDetails();

    if (dashBoardApplicationsLoading) return <Loader />;
    if (dashBoardApplicationsError) return <NotFound />;

    return (
        <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">New Job Applications</h2>
                <div className='flex gap-4'>
                    <button
                        onClick={dashBoardApplicationsRefetch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Refresh
                    </button>
                    <Link to={'/all-resumes'}>View All</Link>
                </div>
            </div>

            {DashBoardApplications.length === 0 ? (
                <p className="text-gray-500 text-center">No applications found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="p-3 border">Applicant</th>
                                <th className="p-3 border">Email</th>
                                <th className="p-3 border">Job Position</th>
                                <th className="p-3 border">Company</th>
                                <th className="p-3 border">Resume</th>
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Applied Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DashBoardApplications.slice(0, 6).map((app) => (
                                <tr key={app._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 border">{app.userId.fullName}</td>
                                    <td className="p-3 border">{app.userId.email}</td>
                                    <td className="p-3 border">{app.jobId.positionTitle}</td>
                                    <td className="p-3 border">{app.jobId.companyName}</td>
                                    <td className="p-3 border">
                                        <a
                                            href={app.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Resume
                                        </a>
                                    </td>
                                    <td className="p-3 border">
                                        <span className={`px-2 py-1 rounded-md text-white ${app.status === 'Pending' ? 'bg-yellow-500' :
                                                app.status === 'Accepted' ? 'bg-green-500' :
                                                    'bg-red-500'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-3 border">{new Date(app.appliedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
