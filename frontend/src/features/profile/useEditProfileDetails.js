import { useMutation } from "@tanstack/react-query";
import { updateCurrentUserDetails } from "../../services/apiAuth"; // Replace with your actual API function

export function useEditProfileDetails() {
    const { mutate: editProfile, isLoading: editProfileLoading } = useMutation({
        mutationFn: (data) => {
            // This function should call the actual API request
            return updateCurrentUserDetails(data); // Ensure updateProfile is defined and handles the API call
        },
        onSuccess: () => {
            console.log("Profile details updated successfully");
        },
        onError: (error) => {
            console.error("Error updating profile:", error);
            throw new Error(error.message);
        },
    });

    return { editProfile, editProfileLoading };
}
