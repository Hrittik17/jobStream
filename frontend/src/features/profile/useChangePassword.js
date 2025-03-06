import { useMutation } from "@tanstack/react-query";
import { userChangePassword } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useChangePassword(){
    const navigate = useNavigate()
    const {mutate:ChangePassword,isLoading:ChangePasswordLoading} = useMutation({
        mutationFn:({email,password})=>{
            return userChangePassword({email,password})
        },
        onSuccess:()=>{
            toast.success('Password has been changed successfully')
            // console.log('Password changed successfully')
            navigate('/profile')
        },
        onError:(err)=>{
            toast.error('Error changing password')
            console.error('Error changing password:',err?.message?.data?.message)
        }           
    })
    return{ChangePassword,ChangePasswordLoading}
}