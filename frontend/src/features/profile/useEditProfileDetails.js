import { useMutation } from "@tanstack/react-query";
import { updateCurrentUserDetails } from "../../services/apiAuth"; // Replace with your actual API function
import toast from "react-hot-toast";

export function useEditProfileDetails() {
    const { mutate: editProfile, isLoading: editProfileLoading } = useMutation({
        mutationFn: (data) => {
            // This function should call the actual API request
            return updateCurrentUserDetails(data); // Ensure updateProfile is defined and handles the API call
        },
        onSuccess: () => {
            toast.success("Profile details updated successfully")
            // console.log("Profile details updated successfully");
        },
        onError: (error) => {
            toast.error("Error updating profile")
            // console.error("Error updating profile:", error);
            throw new Error(error.message);
        },
    });

    return { editProfile, editProfileLoading };
}
