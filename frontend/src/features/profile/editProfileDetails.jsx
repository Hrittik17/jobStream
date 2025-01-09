// import { useForm } from "react-hook-form";
// import { useCurrentUser } from "../authentication/useCurrentUser";
// import { useEditProfileDetails } from "./useEditProfileDetails";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const User_Status = {
//     Student: 'student',
//     Fresher: 'fresher',
//     Working_Professionals: 'workingProfessional',
//     Recruiter: 'recruiter',
// };

// export default function EditProfileDetails() {
//     const { currentUser } = useCurrentUser();
//     const [userFullName,setUserFullName] = useState(fullName)
//     const [userEmail,setUserEmail] = useState(email)
//     const [userGender,setUserGender] = useState(gender)
//     const [userStatus,setUserStatus] = useState(status)
//     const [userAvatar,setUserAvatar] = useState(avatar)

//     const { fullName, email, gender, status,avatar } = currentUser;
//     const { editProfile, editProfileLoading } = useEditProfileDetails()
//     const navigate = useNavigate()

//     const { register, handleSubmit, formState: { errors } } = useForm({
//         defaultValues: {
//             fullName,
//             gender,
//             status,
//             email
//         },
//     });  

//     function handleEditProfile(data) {
//         // Add the email property to the data object
//         const updatedData = {
//             ...data,
//             email: currentUser.email, // Include the email from useCurrentUser
//         };

//         console.log(updatedData);

//         // Call editProfile API with the updated data
//         editProfile(updatedData, {
//             onSuccess: () => {
//                 console.log("Profile details updated successfully");
//                 navigate("/profile");
//             },
//         });
//     }


//     return (
//         <div className="w-full p-6 bg-white shadow-md rounded-md border border-gray-300">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile Details</h2>
//             <form onSubmit={()=>{}}>
//                 <div>
//                     <label htmlFor="avtar">Select image (Max - 1MB)</label>
//                     <input id="avatar" type="file" accept="image/*" value={userAvatar} onChange={(e)=>setUserAvatar(e.target.value)} />
//                 </div>
//                 <div>
//                     <label htmlFor="fullName">FullName</label>
//                     <input id="fullName" type="text" defaultValue={fullName} value={userFullName} onChange={(event)=>setUserFullName(event.target.value)} required />
//                 </div>
//                 <div>
//                     <label htmlFor="gender">Gender</label>
//                     <input id="fullName" type="text" defaultValue={fullName} value={userFullName} onChange={(event)=>setUserFullName(event.target.value)} />
//                 </div>

//                 <div>
//                      <label>Gender</label>
//                      <div>
//                          <div>
//                              <input
//                                  id="male"
//                                  type="radio"
//                                  value="userGender"
//                                  defaultChecked={gender}
//                                  required
//                                  />


//                             <label htmlFor="male">Male</label>
//                         </div>
//                         <div>
//                             <input
//                                 id="female"
//                                 type="radio"
//                                 value=""
//                                 {...register("gender", { required: "Gender is required" })}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="female" className="text-gray-900">Female</label>
//                         </div>
//                         <div>
//                             <input
//                                 id="other"
//                                 type="radio"
//                                 value="other"
//                                 {...register("gender", { required: "Gender is required" })}
//                                 className="mr-2"
//                             />
//                             <label htmlFor="other" className="text-gray-900">Other</label>
//                         </div>
//                     </div>
//                 <div>
//                     <label htmlFor="fullName">FullName</label>
//                     <input id="fullName" type="text" defaultValue={fullName} value={userFullName} onChange={(event)=>setUserFullName(event.target.value)} />
//                 </div>
//                 <div>
//                     <label htmlFor="fullName">FullName</label>
//                     <input id="fullName" type="text" defaultValue={fullName} value={userFullName} onChange={(event)=>setUserFullName(event.target.value)} />
//                 </div>
//             </form>

//         </div>
//     );
// }





// {/* <form onSubmit={handleSubmit(handleEditProfile)} className="space-y-6" encType="multipart/dataform">
//                 <div className="flex flex-col">
//                     <label className="text-gray-600 font-medium text-lg" htmlFor="fullName">
//                         Select an image (max - 1MB)
//                     </label>
//                     <input
//                         id="avatar"
//                         type="file"
//                         accept="image/*"
//                         {...register("avatar", { required: "Avatar picture is required" })}
//                         className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//                     />
//                     {errors.avatar && (
//                         <span className="text-red-500 text-sm mt-1">{errors.avatar.message}</span>
//                     )}
//                 </div>

//                 <div className="flex flex-col">
//                     <label className="text-gray-600 font-medium text-lg" htmlFor="fullName">
//                         Full Name
//                     </label>
//                     <input
//                         id="fullName"
//                         type="text"
//                         {...register("fullName", { required: "Full Name is required" })}
//                         className="mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//                     />
//                     {errors.fullName && (
//                         <span className="text-red-500 text-sm mt-1">{errors.fullName.message}</span>
//                     )}
//                 </div>

//                 {/* Gender Radio Buttons */}
//             //     <div className="flex flex-col">
//             //         <label className="text-gray-600 font-medium text-lg">Gender</label>
//             //         <div className="flex gap-4 mt-2">
//             //             <div>
//             //                 <input
//             //                     id="male"
//             //                     type="radio"
//             //                     value="male"
//             //                     {...register("gender", { required: "Gender is required" })}
//             //                     className="mr-2"
//             //                 />
//             //                 <label htmlFor="male" className="text-gray-900">Male</label>
//             //             </div>
//             //             <div>
//             //                 <input
//             //                     id="female"
//             //                     type="radio"
//             //                     value="female"
//             //                     {...register("gender", { required: "Gender is required" })}
//             //                     className="mr-2"
//             //                 />
//             //                 <label htmlFor="female" className="text-gray-900">Female</label>
//             //             </div>
//             //             <div>
//             //                 <input
//             //                     id="other"
//             //                     type="radio"
//             //                     value="other"
//             //                     {...register("gender", { required: "Gender is required" })}
//             //                     className="mr-2"
//             //                 />
//             //                 <label htmlFor="other" className="text-gray-900">Other</label>
//             //             </div>
//             //         </div>
//             //         {errors.gender && (
//             //             <span className="text-red-500 text-sm mt-1">{errors.gender.message}</span>
//             //         )}
//             //     </div>

//             //     {/* Status Radio Buttons (User_Status) */}
//             //     <div className="flex flex-col">
//             //         <label className="text-gray-600 font-medium text-lg">Status</label>
//             //         <div className="flex gap-4 mt-2">
//             //             {Object.entries(User_Status).map(([label, value]) => (
//             //                 <div key={value}>
//             //                     <input
//             //                         id={value}
//             //                         type="radio"
//             //                         value={value}
//             //                         {...register("status", { required: "Status is required" })}
//             //                         className="mr-2"
//             //                     />
//             //                     <label htmlFor={value} className="text-gray-900">{label}</label>
//             //                 </div>
//             //             ))}
//             //         </div>
//             //         {errors.status && (
//             //             <span className="text-red-500 text-sm mt-1">{errors.status.message}</span>
//             //         )}
//             //     </div>

//             //     <div className="flex flex-col">
//             //         <label className="text-gray-600 font-medium text-lg" htmlFor="email">
//             //             Email (Read-only)
//             //         </label>
//             //         <input
//             //             id="email"
//             //             type="email"
//             //             value={email}
//             //             disabled
//             //             className="mt-2 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
//             //         />
//             //     </div>

//             //     <div className="flex gap-6 justify-end mt-6">
//             //         <button
//             //             onClick={() => navigate(-1)}
//             //             className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-200"
//             //         >
//             //             &larr; back
//             //         </button>
//             //         <button
//             //             type="submit"
//             //             className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition duration-200"
//             //             disabled={editProfileLoading}
//             //         >
//             //             Save Details
//             //         </button>
//             //     </div>
//             // </form> */}


import { useState } from 'react';
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useEditProfileDetails } from "./useEditProfileDetails";
import { useNavigate } from "react-router-dom";

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
    const { fullName, email, gender, status, avatar } = currentUser;
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
    );
}
