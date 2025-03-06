import { useForm } from "react-hook-form";
import { useVerifyOTP } from "../features/forgetPassword/useVerifyOTP";

export default function EnterPasswordWithOtp() {
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;
  const {VerifyOTP,verifyOTPLoading} = useVerifyOTP()

  function submitCodeWithPassword(data) {
    const { password, confirmationCode } = data;
    VerifyOTP(
        { confirmationCode, newPassword: password },
        {
            onSuccess: () => {
                console.log("Password successfully updated");
            },
            onError: (error) => {
                console.error("Error updating password:", error?.response?.data?.message || error.message);
            }
        }
    );
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Enter Password with OTP
        </h1>
        <form onSubmit={handleSubmit(submitCodeWithPassword)}>
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
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </span>
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
                required: "This field is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords must match",
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

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
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Confirmation code must have at least 8 characters",
                },
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmationCode
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.confirmationCode && (
              <span className="text-sm text-red-500 mt-1">
                {errors.confirmationCode.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
