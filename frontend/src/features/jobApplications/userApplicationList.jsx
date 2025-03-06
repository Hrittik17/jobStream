export default function UserApplicationList({ application }) {
    const { jobId, status, resume, appliedAt } = application;
  
    return (
      <div className="application-card border p-4 rounded shadow-md mb-4">
        <h3 className="text-xl font-bold">{jobId.positionTitle}</h3>
        <p>{jobId.companyName} - {jobId.location}</p>
        <p>Status: <span className={`text-${status === 'Pending' ? 'yellow' : 'green'}-500`}>{status}</span></p>
        <p>Applied On: {new Date(appliedAt).toLocaleDateString()}</p>
        <a href={`/${resume}`} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      </div>
    );
  }
  