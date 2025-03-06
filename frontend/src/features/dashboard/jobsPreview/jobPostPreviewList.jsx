export default function JobPostPreviewList({jobs}) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-800">{jobs.jobTitle}</h2>
            <p className="text-md text-gray-600">{jobs.companyName}</p>
            
            <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{jobs.location}</span>
                <span>{jobs.package}</span>
            </div>

        </div>
    );
}

 