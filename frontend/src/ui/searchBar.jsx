// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import {
//   applicationStatusOptions,
//   seniorityLevelOptions,
//   workModeOptions,
//   employmentTypeOptions
// } from "../utils/constants";
// import { Sort_Options } from "../../../utils/constants";
// import { useGetAllJobsPost } from "../features/allJobs/useAllJobsPost";
// // import { useGetAllJobsPost } from "../../hooks/useGetAllJobsPost";

// export default function JobSearchBar() {
//   const [position, setPosition] = useState("");
//   const [location, setLocation] = useState("");
//   const [workMode, setWorkMode] = useState("");
//   const [seniorityLevel, setSeniorityLevel] = useState("");
//   const [employmentType, setEmploymentType] = useState("");
//   const [sort, setSort] = useState("newest");

//   const [searchParams, setSearchParams] = useSearchParams();
//   const { JobPosts, jobPostLoading, jobPostError } = useGetAllJobsPost();

//   // Update query parameters in the URL
//   const updateSearchParams = () => {
//     const params = {};
//     if (position) params.position = position;
//     if (location) params.location = location;
//     if (workMode) params.workMode = workMode;
//     if (seniorityLevel) params.seniorityLevel = seniorityLevel;
//     if (employmentType) params.employmentType = employmentType;
//     if (sort) params.sort = sort;

//     setSearchParams(params);
//   };

//   useEffect(() => {
//     updateSearchParams();
//   }, [position, location, workMode, seniorityLevel,employmentType, sort]);

//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//         <div className="flex flex-col md:flex-row items-center space-x-4">
//           {/* Search Input */}
//           <input
//             type="search"
//             placeholder="Job title or keyword"
//             value={position}
//             onChange={(e) => setPosition(e.target.value)}
//             className="w-full border rounded-md px-3 py-2"
//           />
//           {/* Location Input */}
//           <input
//             type="text"
//             placeholder="Enter the City"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full border rounded-md px-3 py-2"
//           />
//         </div>

//         <div className="flex flex-col md:flex-row items-center space-x-4">
//           {/* Work Mode Options */}
//           <select
//             value={workMode}
//             onChange={(e) => setWorkMode(e.target.value)}
//             className="border rounded-md px-3 py-2"
//           >
//             <option value="">Work Mode</option>
//             {workModeOptions.map((mode) => (
//               <option key={mode} value={mode}>
//                 {mode}
//               </option>
//             ))}
//           </select>

//           {/* Seniority Level Options */}
//           <select
//             value={seniorityLevel}
//             onChange={(e) => setSeniorityLevel(e.target.value)}
//             className="border rounded-md px-3 py-2"
//           >
//             <option value="">Seniority Level</option>
//             {seniorityLevelOptions.map((level) => (
//               <option key={level} value={level}>
//                 {level}
//               </option>
//             ))}
//           </select>

//           <select
//             value={employmentType}
//             onChange={(e) => setEmploymentType(e.target.value)}
//             className="border rounded-md px-3 py-2"
//           >
//             <option value="">Employment Type</option>
//             {employmentTypeOptions.map((level) => (
//               <option key={level} value={level}>
//                 {level}
//               </option>
//             ))}
//           </select>

//           {/* Sort Options */}
//           <select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             className="border rounded-md px-3 py-2"
//           >
//             {Object.entries(Sort_Options).map(([label, value]) => (
//               <option key={value} value={value}>
//                 {label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center space-x-3">
//           <button
//             type="button"
//             onClick={() => {
//               setPosition("");
//               setLocation("");
//               setWorkMode("");
//               setSeniorityLevel("");
//               setSort("newest");
//             }}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             Clear
//           </button>
//           <button
//             type="submit"
//             onClick={updateSearchParams}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  applicationStatusOptions,
  seniorityLevelOptions,
  workModeOptions,
  employmentTypeOptions,
} from "../utils/constants";
import { Sort_Options } from "../../../utils/constants";
import { useGetAllJobsPost } from "../features/allJobs/useAllJobsPost";

export default function JobSearchBar() {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [seniorityLevel, setSeniorLevel] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [sort, setSort] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const { JobPosts, jobPostLoading, jobPostError } = useGetAllJobsPost();

  const debounceTimeoutRef = useRef(null); // Ref to hold the timeout ID

  // Function to update search parameters in the URL
  const updateSearchParams = () => {
    const params = {};
    if (position) params.position = position;
    if (location) params.location = location;
    if (workMode) params.workMode = workMode;
    if (seniorityLevel) params.seniorityLevel = seniorityLevel;
    if (employmentType) params.employmentType = employmentType;
    if (sort) params.sort = sort;

    setSearchParams(params);
  };

  // Debounced version of `updateSearchParams`
  const debouncedUpdateSearchParams = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      updateSearchParams();
    }, 2000); // Delay of 2 seconds
  };

  useEffect(() => {
    debouncedUpdateSearchParams();

    // Cleanup timeout on unmount or before running effect again
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [position, location, workMode, seniorityLevel, employmentType, sort]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="flex flex-col md:flex-row items-center space-x-4">
          {/* Search Input */}
          <input
            type="search"
            placeholder="Job title or keyword"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
          {/* Location Input */}
          <input
            type="text"
            placeholder="Enter the City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center space-x-4">
          {/* Work Mode Options */}
          <select
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Work Mode</option>
            {workModeOptions.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>

          {/* Seniority Level Options */}
          <select
            value={seniorityLevel}
            onChange={(e) => setSeniorLevel(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Seniority Level</option>
            {seniorityLevelOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          {/* Employment Type Options */}
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Employment Type</option>
            {employmentTypeOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            {Object.entries(Sort_Options).map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => {
              setPosition("");
              setLocation("");
              setWorkMode("");
              setSeniorLevel("");
              setSort("newest");
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
          <button
            type="submit"
            onClick={updateSearchParams}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
