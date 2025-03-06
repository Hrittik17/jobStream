import { useMutation } from "@tanstack/react-query";
import { verifyOtpAndUpdatePassword } from "../../services/apiAuth";
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";

export function useVerifyOTP(){
    const navigate = useNavigate()
    const {mutate:VerifyOTP,isLoading:verifyOTPLoading} = useMutation({
        mutationFn:({userEmail, confirmationCode, newPassword})=>{
            console.log("userEmailin react query:",userEmail,confirmationCode,newPassword)
            return verifyOtpAndUpdatePassword(userEmail, confirmationCode, newPassword)
        }, 
        onSuccess:()=>{
            toast.success('Password updated successfully')
            // console.log('Password updated successfully')
            navigate('/login')
        },
        onError:(error)=>{
            toast.error(`Cannot update password ${error.response}`)
            console.error("A verify otp error:",error)
        }

    })
    return {VerifyOTP,verifyOTPLoading}
}