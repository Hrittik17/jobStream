import { useState } from 'react';
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useEditProfileDetails } from "./useEditProfileDetails";
import { useNavigate } from "react-router-dom";
import {userAvatarUploads} from '../../store/firebase.config'
import { ref, uploadBytes } from 'firebase/storage';

const User_Status = {
    Student: 'student',
    Fresher: 'fresher',
    Working_Professionals: 'workingProfessional',
    Recruiter: 'recruiter',
};

export default function EditProfileDetails() {
    // Define state for form fields
    const [userFullName, setUserFullName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userAvatar, setUserAvatar] = useState(null);
    const [fileError, setFileError] = useState('');

    // Handle file change for avatar upload
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        // Check if file exists and size is less than 1 MB
        if (file) {
            if (file.size > 960160) {  // 1 MB in bytes
                setFileError('File size exceeds 1 MB. Please upload a smaller file.');
                setUserAvatar(null);  // Clear file if invalid
            } else {
                setFileError('');
                setUserAvatar(file);
            }
        }
    };

    const { currentUser } = useCurrentUser();
    const {_id, fullName, email, gender, status, avatar } = currentUser;
    const { editProfile, editProfileLoading } = useEditProfileDetails()
    const navigate = useNavigate()
    console.log(currentUser)

    // Set initial values when currentUser data is loaded
    useState(() => {
        setUserFullName(fullName);
        setUserEmail(email);
        setUserGender(gender);
        setUserStatus(status);
        setUserAvatar(avatar);
    }, [currentUser]);

    // Handle form submission
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const updatedData = {
    //         fullName: userFullName,
    //         email: userEmail,
    //         gender: userGender,
    //         status: userStatus,
    //         avatar: userAvatar,
    //     };
    //     console.log(updatedData.avatar);
    //     editProfile(updatedData, {
    //         onSuccess: () => {
    //             console.log("Profile details updated successfully");
    //             navigate("/profile");
    //         },
    //     });

    // };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("fullName", userFullName);
        formData.append("email", userEmail);
        formData.append("gender", userGender);
        formData.append("status", userStatus);

        if (userAvatar) {
            // const imageRef = ref(userAvatar,`userAvatar/_id`)
            // uploadBytes(imageRef)
            formData.append("avatar", userAvatar);
        }

        editProfile(formData, {
            onSuccess: (data) => {
                console.log("Profile details updated successfully");
                console.log("Updated User Data:", data); // Verify if 'avatar' is present
                navigate("/");
            },
        });
    };


    return (
        <>
            <div className="w-full p-6 bg-white shadow-md rounded-md border border-gray-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile Details</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Avatar Upload */}
                    <div className="mb-4">
                        <label htmlFor="avatar" className="block text-gray-700 font-medium">Select image (Max - 1MB)</label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="mt-2 p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 font-medium">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            value={userFullName}
                            defaultValue={fullName}
                            onChange={(e) => setUserFullName(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Gender</label>
                        <div>
                            <label htmlFor="male" className="mr-4">
                                <input
                                    id="male"
                                    type="radio"
                                    value="male"
                                    checked={userGender === 'male'}
                                    onChange={() => setUserGender('male')}
                                    defaultValue={gender}
                                />
                                Male
                            </label>
                            <label htmlFor="female" className="mr-4">
                                <input
                                    id="female"
                                    type="radio"
                                    value="female"
                                    checked={userGender === 'female'}
                                    onChange={() => setUserGender('female')}
                                />
                                Female
                            </label>
                            <label htmlFor="other">
                                <input
                                    id="other"
                                    type="radio"
                                    value="other"
                                    checked={userGender === 'other'}
                                    onChange={() => setUserGender('other')}
                                />
                                Other
                            </label>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Status</label>
                        <div>
                            {Object.entries(User_Status).map(([label, value]) => (
                                <label key={value} htmlFor={value} className="mr-4">
                                    <input
                                        id={value}
                                        type="radio"
                                        value={value}
                                        defaultValue={status}
                                        checked={userStatus === value}
                                        onChange={() => setUserStatus(value)}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={userEmail}
                            defaultValue={email}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded-md hover:cursor-not-allowed"
                            disabled
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition duration-200"
                            disabled={editProfileLoading}
                        >
                            Save Details
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}


