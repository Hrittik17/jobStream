import { useState } from "react";
import Loader from "../../ui/loader";
import { useCurrentUser } from "../authentication/useCurrentUser";
import EditProfileDetails from "./editProfileDetails";
import { useNavigate } from "react-router-dom";

export default function ProfileDetails() {
  const [showEditForm, setShowEditForm] = useState(false);
  // const navigate = useNavigate()
  const showForm = () => setShowEditForm(true);
  const { currentUser, currentUserLoading } = useCurrentUser();

  if (currentUserLoading) {
    return <Loader />;
  }

  const { fullName, email, gender, status } = currentUser;

  return (
    <div
      style={{
        backgroundImage: `url('/profile-details.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Ensures it spans the full viewport height
      }}
    >
      <div className="w-full p-6 mb-10 bg-white bg-opacity-80 shadow-md rounded-md border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{fullName} Profile Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex gap-6">
            <span className="text-gray-600 font-medium text-lg">Full Name:</span>
            <span className="text-gray-900 text-lg">{fullName}</span>
          </div>
          <div className="flex gap-6">
            <span className="text-gray-600 font-medium text-lg">Email:</span>
            <span className="text-gray-900 text-lg">{email}</span>
          </div>
          <div className="flex gap-6">
            <span className="text-gray-600 font-medium text-lg">Gender:</span>
            <span className="text-gray-900 capitalize text-lg">{gender}</span>
          </div>
          <div className="flex gap-6">
            <span className="text-gray-600 font-medium text-lg">Status:</span>
            <span className="text-gray-900 capitalize text-lg">{status}</span>
          </div>
        </div>
        <div className="flex gap-8 justify-end">
          <button
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-200"
            onClick={showForm}
          >
            Edit Details
          </button>
        </div>
      </div>
      {showEditForm && <EditProfileDetails />}
    </div>
  );
}
