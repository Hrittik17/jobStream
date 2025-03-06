import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/loader";
import { useCurrentUser } from "../authentication/useCurrentUser";
import EditProfileDetails from "./editProfileDetails";

export default function ProfileDetails() {
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const showForm = () => setShowEditForm(true);
  const { currentUser, currentUserLoading } = useCurrentUser();

  if (currentUserLoading) {
    return <Loader />;
  }

  const { fullName, email, gender, status, avatar } = currentUser;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          {fullName}'s Profile
        </h2>
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md shadow hover:bg-gray-200 transition duration-200"
        >
          ← Back
        </button>
      </div>

      {/* Profile Details */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={avatar || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <ProfileDetail label="Full Name" value={fullName} />
        <ProfileDetail label="Email" value={email} />
        <ProfileDetail label="Gender" value={gender} />
        <ProfileDetail label="Status" value={status} />
      </div>

      {/* Edit Button */}
      <div className="text-right">
        <button
          className="px-5 py-2 bg-blue-500 text-white rounded-md font-medium shadow-md hover:bg-blue-600 transition duration-200"
          onClick={showForm}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Form */}
      {showEditForm && (
        <div className="mt-6">
          <EditProfileDetails />
        </div>
      )}
    </div>
  );
}

// Profile Detail Component
function ProfileDetail({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-600 font-medium text-sm uppercase">{label}</span>
      <span className="text-gray-800 text-lg">{value}</span>
    </div>
  );
}