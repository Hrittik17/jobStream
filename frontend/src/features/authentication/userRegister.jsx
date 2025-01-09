import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "../../ui/logo";
import { useSignUp } from "./useSignUp";

export default function UserRegister() {
    const { register, formState, handleSubmit,reset } = useForm();  //getValues,
    const { errors } = formState;
    const navigate = useNavigate()
    const {signUp,signUpLoading} = useSignUp()

    function handleRegisterSubmit(data) {
        console.log(data)
        signUp(data,{
            onSettled:reset()
        })       
    }

    return (
        <>
            <div className="max-w-3xl mx-auto mt-6">
                <div>
                    <Logo />
                </div>
                <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
                <form
                    onSubmit={handleSubmit(handleRegisterSubmit)}
                    className="bg-white p-8 mt-6 rounded-lg shadow-md space-y-6"
                >
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                {...register("fullName", { required: "This field is required" })}
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.fullName && (
                                <span className="text-sm text-red-500 mt-1">{errors.fullName.message}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Please provide a valid email address",
                                    },
                                })}
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "This field is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters",
                                    },
                                })}
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
                            )}
                        </div>

                        {/* Confirm Password
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register("confirmPassword", {
                                    required: "This field is required",
                                    validate: (value) =>
                                        value === getValues().password || "Passwords must match",
                                })}
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.confirmPassword && (
                                <span className="text-sm text-red-500 mt-1">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div> */}

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                id="gender"
                                {...register("gender", { required: "This field is required" })}
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.gender ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && (
                                <span className="text-sm text-red-500 mt-1">{errors.gender.message}</span>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                id="status"
                                {...register("status", { required: "This field is required" })}
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.status ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                <option value="">Select</option>
                                <option value="student">Student</option>
                                <option value="fresher">Fresher</option>
                                <option value="workingProfessional">Working Professional</option>
                                <option value="recruiter">Recruiter</option>
                            </select>
                            {errors.status && (
                                <span className="text-sm text-red-500 mt-1">{errors.status.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            className="border-none rounded-md font-medium text-sm flex items-center gap-2 px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="border-none rounded-md font-medium text-sm flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                            disabled={signUpLoading}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}




// {/* Nationality */}
// <div>
// <label
//     htmlFor="nationality"
//     className="block text-sm font-medium text-gray-700 mb-1"
// >
//     Nationality
// </label>
// <input
//     type="text"
//     id="nationality"
//     {...register("nationality", { required: "This field is required" })}
//     className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nationality ? "border-red-500" : "border-gray-300"
//         }`}
// />
// {errors.nationality && (
//     <span className="text-sm text-red-500 mt-1">{errors.nationality.message}</span>
// )}
// </div>

// {/* Date of Birth */}
// <div>
// <label
//     htmlFor="dateOfBirth"
//     className="block text-sm font-medium text-gray-700 mb-1"
// >
//     Date of Birth
// </label>
// <input
//     type="date"
//     id="dateOfBirth"
//     {...register("dateOfBirth", { required: "This field is required" })}
//     className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"
//         }`}
// />
// {errors.dateOfBirth && (
//     <span className="text-sm text-red-500 mt-1">{errors.dateOfBirth.message}</span>
// )}
// </div>