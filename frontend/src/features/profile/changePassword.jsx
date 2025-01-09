import { useForm } from "react-hook-form";
import Loader from "../../ui/loader"
import NotFound from "../../ui/notFound"
import { useCurrentUser } from "../authentication/useCurrentUser"
import { useChangePassword } from "./useChangePassword";

export default function ChangePassword() {
    const { currentUser, currentUserError, currentUserLoading } = useCurrentUser()
    const {ChangePassword,ChangePasswordLoading} = useChangePassword()
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm();

    if (currentUserLoading) {
        return <Loader />
    }
    if (currentUserError) {
        return <NotFound />
    }

    const { email, fullName } = currentUser

    function handlePasswordChange(data){
        const {email,confirmPassword} = data
        console.log(email,confirmPassword)
        ChangePassword({email,password: confirmPassword},{
            onSuccess:()=>{
                console.log('Password changed successfully')
            },
            onError:(err)=>{
                console.error('Error changing password:',err?.message?.data?.message)
            }
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-6">
                {/* Full Name */}
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 font-medium">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        // value={fullName}
                        defaultValue={fullName}
                        className="mt-2 p-2 border border-gray-300 hover:cursor-none rounded-md"
                        disabled
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        defaultValue={email}
                        readOnly
                        {...register("email", {
                            // required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please provide a valid email address",
                            },
                        })}
                        className={`w-full p-3 border rounded-lg hover:cursor-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password (min 8 characters)
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

                Confirm Password
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
                </div>


                {/* Submit Button */}
                <div className="flex gap-6 justify-end">
                    <button
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-200"

                    >
                        &larr; Back
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition duration-200"
                        disabled={ChangePasswordLoading}

                    >
                        Change Password
                    </button>
                </div>

            </form>
        </div>
    )
}
