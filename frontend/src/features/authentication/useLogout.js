import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { userLogout } from "../../services/apiAuth"

export function useLogOut(){
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {mutate:LogOut,isLoading:logOutLoading} = useMutation({
        mutationFn:userLogout,
        onSuccess:()=>{
            queryClient.removeQueries()
            console.log("User logged out")
            navigate('/')
        },
        onError:(err)=>{
            console.error("User logged out failed",err)
        }
    })
    return {LogOut,logOutLoading}
}