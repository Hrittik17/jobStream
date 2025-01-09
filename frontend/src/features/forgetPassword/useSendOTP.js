import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../../services/apiAuth";

export function useSendOTP(){
    const {mutate:SendOTP,isLoading:sendOTPLoading} = useMutation({
        mutationFn:(userEmail)=>{
            console.log(userEmail)
            return sendOTP(userEmail)
        },
        onSuccess:()=>{
            console.log('Confirmation code is successfully send')
        },
        onError:(error)=>{
            console.error('Cannot send the confirmation code',error)
            throw new Error(error?.meesage?.response?.data)
        }
    })
    return {SendOTP,sendOTPLoading}
}
