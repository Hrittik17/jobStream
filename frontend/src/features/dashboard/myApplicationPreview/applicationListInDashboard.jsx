export default function ApplicationListInDashboard({ application }) {
    const { jobId, status, resume, appliedAt } = application;
  
    return (
      <div className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded-lg shadow-sm">
        <div className="flex-1">
          <p className="text-lg font-semibold">{jobId.positionTitle}</p>
          <p className="text-sm text-gray-500">{jobId.companyName} - {jobId.location}</p>
          <p className="text-sm mt-2">
            Status: <span className={`text-${status === 'Pending' ? 'yellow' : 'green'}-500`}>{status}</span>
          </p>
        </div>
      </div>
    );
  }
  