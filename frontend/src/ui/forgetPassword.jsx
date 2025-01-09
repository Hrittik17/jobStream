import { useState } from "react";
import Logo from "./logo";
import EnterPasswordWithOtp from "./enterPasswordWithOtp";
import { useSendOTP } from "../features/forgetPassword/useSendOTP";

export default function ForgetPassword() {
    const [userEmail, setUserEmail] = useState("");
    const [emailSubmitted, setEmailSubmitted] = useState(false)
    const {SendOTP,sendOTPLoading} = useSendOTP()
    
    function handleSendConfirmationCode(){
        console.log(userEmail)
        if (!userEmail) {
            console.error("Email is required");
            return;
          }
        SendOTP(userEmail,{
            onSuccess:()=>{
                console.log('Successfully sent the confirmation code')
            }, onError:(error)=>{
                console.log('Error sending the confirmation code',error)
            }
        })
        setEmailSubmitted(true)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <Logo />
                <h1 className="mt-8 text-2xl font-semibold text-gray-800 mb-4">
                    Forgot Password
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Enter your email address below to receive a confirmation code.
                </p>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={userEmail}
                        onChange={(event) => setUserEmail(event.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="text-center flex gap-6 justify-end">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                        type="button"
                    >
                        &larr; back
                    </button>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                        type="button"
                        onClick={handleSendConfirmationCode}
                    >
                        Send OTP
                    </button>
                </div>
                {emailSubmitted && <EnterPasswordWithOtp/>}
            </div>
        </div>
    );
}
