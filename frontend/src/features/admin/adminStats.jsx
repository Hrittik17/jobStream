import { FaUsers } from "react-icons/fa6";
import { MdOutlineFactCheck } from "react-icons/md";
import { useAdminData } from "./useAdminData";
import Loader from "../../ui/loader";

export default function AdminStats() {
  const { adminData, adminDataLoading } = useAdminData();

  if (adminDataLoading) {
    return <Loader />;
  }

  const { usersCount, jobsCount } = adminData;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Users Stat Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
            <FaUsers className="w-8 h-8" />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-700">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{usersCount}</p>
          </div>
        </div>
      </div>

      {/* Jobs Stat Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <MdOutlineFactCheck className="w-8 h-8" />
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-700">Total Jobs</p>
            <p className="text-2xl font-bold text-gray-900">{jobsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
