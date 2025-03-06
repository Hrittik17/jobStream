import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSendOTP(){
    const {mutate:SendOTP,isLoading:sendOTPLoading} = useMutation({
        mutationFn:(userEmail)=>{
            console.log(userEmail)
            return sendOtp(userEmail)
        },
        onSuccess:()=>{
            toast.success('Confirmation code is successfully send')
            console.log('Confirmation code is successfully send')
        },
        onError:(error) => {
            // const message = error?.response?.data?.message || "An unexpected error occurred";
            toast.error(`Cannot send the confirmation code ${error.response}`)
            console.error("Cannot send the confirmation code:", error);
            throw new Error(error);
        }
    })
    return {SendOTP,sendOTPLoading}
}
