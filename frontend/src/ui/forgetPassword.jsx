// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Logo from "./logo";
// import EnterPasswordWithOtp from "./enterPasswordWithOtp";
// import { useSendOTP } from "../features/forgetPassword/useSendOTP";
// import { useVerifyOTP } from "../features/forgetPassword/useVerifyOTP";

// export default function ForgetPassword() {
//     const [userEmail, setUserEmail] = useState("");
//     const [emailSubmitted, setEmailSubmitted] = useState(false)
//     const { register, formState, handleSubmit, getValues, reset } = useForm();
//     const { errors } = formState;
//     const [isOTPSent, setIsOTPSent] = useState(false)
//     const { SendOTP, sendOTPLoading } = useSendOTP()
//     const { VerifyOTP, verifyOTPLoading } = useVerifyOTP()

//     function handleSendConfirmationCode() {
//         console.log(userEmail)
//         if (!userEmail) {
//             console.error("Email is required");
//             return;
//         }
//         SendOTP(userEmail, {
//             onSuccess: () => {
//                 console.log('Successfully sent the confirmation code')
//             }, onError: (error) => {
//                 console.log('Error sending the confirmation code', error)
//             }
//         })
//         setIsOTPSent(true)
//     }

//     function submitCodeWithPassword(data) {
//         const { password, confirmationCode } = data;
//         VerifyOTP(
//             { userEmail, confirmationCode, newPassword: password },
//             {
//                 onSuccess: () => {
//                     console.log("Password successfully updated");
//                 },
//                 onError: (error) => {
//                     console.error("Error updating password:", error?.response?.data?.message || error.message);
//                 }
//             }
//         );
//     }


//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//                 <Logo />
//                 <h1 className="mt-8 text-2xl font-semibold text-gray-800 mb-4">
//                     Forgot Password
//                 </h1>
//                 <p className="text-sm text-gray-600 mb-6">
//                     Enter your email address below to receive a confirmation code.
//                 </p>

//                 <div className="mb-4">
//                     <label
//                         htmlFor="email"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                         Email
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={userEmail}
//                         onChange={(event) => setUserEmail(event.target.value)}
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
//                         placeholder="Enter your email"
//                     />
//                 </div>
//                 {isOTPSent ? (

//                     <div className="text-center flex gap-6 justify-end">
//                         <button
//                             className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
//                             type="button"
//                         >
//                             &larr; back
//                         </button>
//                         <button
//                             className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
//                             type="button"
//                             onClick={handleSendConfirmationCode}
//                         >
//                             Send OTP
//                         </button>
//                     </div>
//                 ) : (
//                     <form onSubmit={handleSubmit(submitCodeWithPassword)}>
//                         {/* Password Field */}
//                         <div className="mb-4">
//                             <label
//                                 htmlFor="password"
//                                 className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 {...register("password", {
//                                     required: "This field is required",
//                                     minLength: {
//                                         value: 8,
//                                         message: "Password must have at least 8 characters",
//                                     },
//                                 })}
//                                 className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"
//                                     }`}
//                             />
//                             {errors.password && (
//                                 <span className="text-sm text-red-500 mt-1">
//                                     {errors.password.message}
//                                 </span>
//                             )}
//                         </div>

//                         {/* Confirm Password Field */}
//                         <div className="mb-4">
//                             <label
//                                 htmlFor="confirmPassword"
//                                 className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                                 Confirm Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 {...register("confirmPassword", {
//                                     required: "This field is required",
//                                     validate: (value) =>
//                                         value === getValues("password") || "Passwords must match",
//                                 })}
//                                 className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword
//                                     ? "border-red-500"
//                                     : "border-gray-300"
//                                     }`}
//                             />
//                             {errors.confirmPassword && (
//                                 <span className="text-sm text-red-500 mt-1">
//                                     {errors.confirmPassword.message}
//                                 </span>
//                             )}
//                         </div>

//                         {/* Confirmation Code Field */}
//                         <div className="mb-4">
//                             <label
//                                 htmlFor="confirmationCode"
//                                 className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                                 Confirmation Code
//                             </label>
//                             <input
//                                 type="text"
//                                 id="confirmationCode"
//                                 {...register("confirmationCode", {
//                                     required: "This field is required",
//                                     minLength: {
//                                         value: 8,
//                                         message: "Confirmation code must have at least 8 characters",
//                                     },
//                                 })}
//                                 className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmationCode
//                                     ? "border-red-500"
//                                     : "border-gray-300"
//                                     }`}
//                             />
//                             {errors.confirmationCode && (
//                                 <span className="text-sm text-red-500 mt-1">
//                                     {errors.confirmationCode.message}
//                                 </span>
//                             )}
//                         </div>
//                         {/* Submit Button */}
//                         <div className="mt-6">
//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
//                                 disabled={verifyOTPLoading}
//                             >
//                                 Submit
//                             </button>
//                         </div>)}
//                     </div>
//         </div>
//             );
// }







// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import Logo from "./logo";
// import { useSendOTP } from "../features/forgetPassword/useSendOTP";
// import { useVerifyOTP } from "../features/forgetPassword/useVerifyOTP";

// export default function ForgetPassword() {
//   const [step, setStep] = useState("enterEmail"); // Tracks the current step
//   const [userEmail, setUserEmail] = useState("");
//   const { register, formState, handleSubmit, getValues, reset } = useForm();
//   const { errors } = formState;
//   const { SendOTP, sendOTPLoading } = useSendOTP();
//   const { VerifyOTP, verifyOTPLoading } = useVerifyOTP();

//   function handleSendConfirmationCode() {
//     if (!userEmail) return;
//     SendOTP(userEmail, {
//       onSuccess: () => {
//         setStep("otpSent");
//       },
//       onError: (error) => {
//         console.error("Error sending confirmation code:", error);
//         alert("Failed to send confirmation code. Please try again.");
//       },
//     });
//   }

//   function submitCodeWithPassword(data) {
//     const { password, confirmationCode } = data;
//     VerifyOTP(
//       { userEmail, confirmationCode, newPassword: password },
//       {
//         onSuccess: () => {
//           alert("Password successfully updated.");
//           reset();
//           setStep("enterEmail");
//         },
//         onError: (error) => {
//           console.error("Error updating password:", error);
//           alert("Failed to reset password. Please check your code and try again.");
//         },
//       }
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <Logo />
//         <h1 className="mt-8 text-2xl font-semibold text-gray-800 mb-4">
//           Forgot Password
//         </h1>

//         {step === "enterEmail" && (
//           <>
//             <p className="text-sm text-gray-600 mb-6">
//               Enter your email address below to receive a confirmation code.
//             </p>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 {...register("email", { required: "Email is required" })}
//                 value={userEmail}
//                 onChange={(e) => setUserEmail(e.target.value)}
//                 className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your email"
//                 disabled={sendOTPLoading}
//               />
//               {errors.email && (
//                 <span className="text-sm text-red-500">{errors.email.message}</span>
//               )}
//             </div>
//             <button
//               onClick={handleSendConfirmationCode}
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
//               disabled={sendOTPLoading}
//             >
//               {sendOTPLoading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === "otpSent" && (
//           <>
//             <p className="text-sm text-gray-600 mb-6">
//               Enter the confirmation code and your new password below.
//             </p>
//             <form onSubmit={handleSubmit(submitCodeWithPassword)}>
//               {/* Confirmation Code Field */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="confirmationCode"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Confirmation Code
//                 </label>
//                 <input
//                   type="text"
//                   id="confirmationCode"
//                   {...register("confirmationCode", {
//                     required: "Confirmation code is required",
//                     minLength: {
//                       value: 8,
//                       message: "Code must be at least 8 characters",
//                     },
//                   })}
//                   className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                     errors.confirmationCode ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.confirmationCode && (
//                   <span className="text-sm text-red-500">
//                     {errors.confirmationCode.message}
//                   </span>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 8,
//                       message: "Password must have at least 8 characters",
//                     },
//                   })}
//                   className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                     errors.password ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.password && (
//                   <span className="text-sm text-red-500">{errors.password.message}</span>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                     validate: (value) =>
//                       value === getValues("password") || "Passwords must match",
//                   })}
//                   className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
//                     errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.confirmPassword && (
//                   <span className="text-sm text-red-500">
//                     {errors.confirmPassword.message}
//                   </span>
//                 )}
//               </div>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => setStep("enterEmail")}
//                   className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-200"
//                 >
//                   Back
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
//                   disabled={verifyOTPLoading}
//                 >
//                   {verifyOTPLoading ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "./logo";
import { useSendOTP } from "../features/forgetPassword/useSendOTP";
import { useVerifyOTP } from "../features/forgetPassword/useVerifyOTP";

export default function ForgetPassword() {
  const [step, setStep] = useState("enterEmail"); // Tracks the current step
  const [userEmail, setUserEmail] = useState("");
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;
  const { SendOTP, sendOTPLoading } = useSendOTP();
  const { VerifyOTP, verifyOTPLoading } = useVerifyOTP();

  // Send confirmation code
  const handleSendConfirmationCode = async () => {
    if (!userEmail) return;
    try {
      await SendOTP(userEmail); // Make sure SendOTP is asynchronous
      setStep("otpSent");
    } catch (error) {
      console.error("Error sending confirmation code:", error);
      alert("Failed to send confirmation code. Please try again.");
    }
  };

  // Submit OTP and password
  const submitCodeWithPassword = (data) => {
    const { password, confirmationCode } = data;
    console.log("password in submission:",password,"confirmation code:",confirmationCode,"email in submission:",userEmail);
    VerifyOTP(
      { userEmail, confirmationCode, newPassword: password },
      {
        onSuccess: () => {
          alert("Password successfully updated.");
          reset();
          setStep("enterEmail");
        },
        onError: (error) => {
          console.error("Error updating password:", error);
          alert("Failed to reset password. Please check your code and try again.");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <Logo />
        <h1 className="mt-8 text-2xl font-semibold text-gray-800 mb-4">
          Forgot Password
        </h1>

        {step === "enterEmail" && (
          <>
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
                {...register("email", { required: "Email is required" })}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                disabled={sendOTPLoading}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>
            <button
              onClick={handleSendConfirmationCode}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              disabled={sendOTPLoading}
            >
              {sendOTPLoading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otpSent" && (
          <>
            <p className="text-sm text-gray-600 mb-6">
              Enter the confirmation code and your new password below.
            </p>
            <form onSubmit={handleSubmit(submitCodeWithPassword)}>
              {/* Confirmation Code Field */}
              <div className="mb-4">
                <label
                  htmlFor="confirmationCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirmation Code
                </label>
                <input
                  type="text"
                  id="confirmationCode"
                  {...register("confirmationCode", {
                    required: "Confirmation code is required",
                    minLength: {
                      value: 8,
                      message: "Code must be at least 8 characters",
                    },
                  })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmationCode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.confirmationCode && (
                  <span className="text-sm text-red-500">
                    {errors.confirmationCode.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">{errors.password.message}</span>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
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
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") || "Passwords must match",
                  })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep("enterEmail")}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                  disabled={verifyOTPLoading}
                >
                  {verifyOTPLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
