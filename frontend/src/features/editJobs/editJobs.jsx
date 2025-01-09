import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useJobDetails } from "../allJobs/useJobDetails";
import { applicationStatusOptions, employmentTypeOptions, seniorityLevelOptions, workModeOptions, candidateQuotaOptions } from '../../utils/constants.js'
import Loader from "../../ui/loader.jsx";
import { useEditJobs } from "../addJob/useEditJobs.js";
import { useDeleteJobs } from "../addJob/useDeleteJobs.js";

export default function EditJobs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { jobDetails, jobDetailsLoading, error } = useJobDetails();
  const {editJob,editJobLoading} = useEditJobs()
  const {deleteJobs,deleteJobLoading} = useDeleteJobs()

    const navigate = useNavigate();
    const {id} = useParams()

    if (jobDetailsLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-center text-red-500">Failed to load job details.</p>;
    }

    if (!jobDetails) {
        return <p className="text-center text-gray-500">Job not found.</p>;
    }
  
  // console.log(jobDetails)


  const onSubmit = (data) => {
    console.log("Job Data:", data);
    editJob(data, {
      onSuccess:()=>{
        navigate('/my-jobs')
      } 
    })
  };

  const handleDelete = () => {
    deleteJobs(id, {
        onSuccess: () => {
            console.log("Successfully deleted the job");
            navigate('/my-jobs');
        },
    });
};




  const { positionTitle,
    companyName,
    seniorityLevel,
    employmentType,
    workMode,
    location,
    description,
    package: jobPackage,
    candidateQuota,
    applicationStatus,
    createdAt,
    responsibility,
    aboutRole,
    qualification, } = jobDetails

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md mt-10 space-y-6">
      {/* Back Button */}
      <button
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600 transition-all duration-300"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Title and Note */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Edit Job Details</h1>
        <p className="text-sm text-gray-600">
          <span className="text-red-500">*</span> Indicates a required field.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Position Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue={positionTitle}
            {...register("positionTitle", { required: "Position Title is required" })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.positionTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.positionTitle.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue={companyName}
            {...register("companyName", { required: "Company Name is required" })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
          )}
        </div>

        {/* Package  */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Package <span className="text-red-500">*</span>
          </label>
          <input
            type="Number"
            defaultValue={jobPackage}
            {...register("package", { required: "Package is required" })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.package && (
            <p className="text-red-500 text-sm mt-1">{errors.package.message}</p>
          )}
        </div>

        {/* About this role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            About this role <span className="text-red-500">*</span>
          </label>
          <textarea
            defaultValue={aboutRole}
            {...register("aboutRole", { required: "Description is required" })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {errors.aboutRole && (
            <p className="text-red-500 text-sm mt-1">{errors.aboutRole.message}</p>
          )}
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Qualification <span className="text-red-500">*</span>
          </label>
          <textarea
            defaultValue={qualification}
            {...register("qualification", { required: "Description is required" })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {errors.qualification && (
            <p className="text-red-500 text-sm mt-1">{errors.qualification.message}</p>
          )}
        </div>

        {/* responsibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Responsibility <span className="text-red-500">*</span>
          </label>
          <textarea
            defaultValue={responsibility}
            {...register("responsibility", { required: "Description is required" })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {errors.responsibility && (
            <p className="text-red-500 text-sm mt-1">{errors.responsibility.message}</p>
          )}
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            defaultValue={description}
            {...register("description", { required: "Description is required" })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Application Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Application Status</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {applicationStatusOptions.map((status) => (
              <label key={status} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  defaultChecked={applicationStatus}
                  {...register("applicationStatus")}
                  value={status}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {employmentTypeOptions.map((type) => (
              <label key={type} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  defaultChecked={employmentType}
                  {...register("employmentType", {
                    required: "An employment type is required",
                  })}
                  value={type}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
          {errors.employmentType && (
            <p className="text-red-500 text-sm mt-1">{errors.employmentType.message}</p>
          )}
        </div>

        {/* Seniority Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Seniority Level <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {seniorityLevelOptions.map((level) => (
              <label key={level} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  defaultChecked={seniorityLevel}
                  {...register("seniorityLevel", {
                    required: "A seniority level is required",
                  })}
                  value={level}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700">{level}</span>
              </label>
            ))}
          </div>
          {errors.seniorityLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.seniorityLevel.message}</p>
          )}
        </div>

        {/* Work Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Mode <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {workModeOptions.map((mode) => (
              <label key={mode} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  defaultChecked={workMode}
                  {...register("workMode", {
                    required: "A work mode is required",
                  })}
                  value={mode}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700">{mode}</span>
              </label>
            ))}
          </div>
          {errors.workMode && (
            <p className="text-red-500 text-sm mt-1">{errors.workMode.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            defaultValue={location}
            {...register("location")}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Default: my city"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            candidate Quota <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {candidateQuotaOptions.map((quota) => (
              <label key={quota} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  defaultChecked={candidateQuota}
                  {...register("candidateQuota", {
                    required: "A work mode is required",
                  })}
                  value={quota}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-700">{quota}</span>
              </label>
            ))}
          </div>
          {errors.candidateQuota && (
            <p className="text-red-500 text-sm mt-1">{errors.candidateQuota.message}</p>
          )}
        </div>

        {/* buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="submit"
            className="border-none rounded-md font-medium text-sm flex items-center gap-2 px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
            disabled={editJobLoading}
          >
            Post Job
          </button>

          <button
            onClick={handleDelete}
            className="border-none rounded-md font-medium text-sm flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
            disabled={deleteJobLoading}
          >
            Delete This Job
          </button>
        </div>

      </form>
    </div>
  );
}
