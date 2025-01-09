import { useMutation } from "@tanstack/react-query";
import { userChangePassword } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useChangePassword(){
    const navigate = useNavigate()
    const {mutate:ChangePassword,isLoading:ChangePasswordLoading} = useMutation({
        mutationFn:({email,password})=>{
            return userChangePassword({email,password})
        },
        onSuccess:()=>{
            console.log('Password changed successfully')
            navigate('/profile')
        },
        onError:(err)=>{
            console.error('Error changing password:',err?.message?.data?.message)
        }           
    })
    return{ChangePassword,ChangePasswordLoading}
}