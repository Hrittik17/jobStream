import React from 'react'
import { useGetResumesCount } from './useGetResumesCount'
import Loader from '../../ui/loader'
import NotFound from '../../ui/notFound'

export default function AllResumesCount() {
    const {ResumeCount,resumeCountLoading,resumeCountError,resumeCountRefetch} = useGetResumesCount()

    if(resumeCountLoading) return <Loader/>
    if(resumeCountError) return <NotFound/>

    console.log('resumes count :',ResumeCount)
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Resumes per Job</h1>
            
            {ResumeCount?.length === 0 ? (
                <p className="text-gray-500">No job applications found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left text-gray-600">Job Title</th>
                                <th className="p-3 text-left text-gray-600">Company</th>
                                <th className="p-3 text-left text-gray-600">Resumes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ResumeCount?.slice(0, 6).map((job) => (
                                <tr key={job._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{job.positionTitle}</td>
                                    <td className="p-3">{job.companyName}</td>
                                    <td className="p-3 font-semibold text-blue-600">{job.resumeCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
