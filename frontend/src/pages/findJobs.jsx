import AllJobsLayout from "../features/allJobs/allJobsLayout";
import JobSearchBar from "../ui/searchBar";

export default function FindJobs() {
  return (
    <div    >
      <div className="mb-10">
        <JobSearchBar/>
      </div>
      <div className="bg-white bg-opacity-80 min-h-full">
        <AllJobsLayout />
      </div>
    </div>
  );
}
