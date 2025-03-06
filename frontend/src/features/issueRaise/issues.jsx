import React from 'react';
import { useGetAllIssues } from './useGetAllIssues';
import Loader from '../../ui/loader';
import NotFound from '../../ui/notFound';
import BackButton from '../../ui/backButton';

export default function Issues() {
  const { data, issuesLoading, issuesError, issuesRefetch } = useGetAllIssues();

  if (issuesLoading) return <Loader />;
  if (issuesError) return <NotFound />;

  return (
    <div className="p-6">
      <BackButton/>
      <h1 className="text-2xl font-bold mt-4 mb-4">Issues</h1>

      {data?.length === 0 ? (
        <p className="text-gray-500">No issues found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((issue) => (
            <div key={issue._id} className="border rounded-lg p-4 shadow-md bg-white">
              <p className="text-gray-700 font-semibold">{issue.email}</p>
              <p className="text-gray-600">{issue.issue}</p>
              <p className="text-sm text-gray-400">{new Date(issue.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
