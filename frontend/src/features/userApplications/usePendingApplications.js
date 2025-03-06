import { useMutation } from "@tanstack/react-query";
import { acceptResume, pendingResume } from "../../services/apiUser";
import toast from "react-hot-toast";

export function usePendingApplication(){
    const {mutate:pendingApplication,isLoading:pendingLoading} = useMutation({
        mutationFn:({_id,email})=>{
            return pendingResume(_id,email)
        },
        onSuccess:()=>{
            toast.success('On Hold the application and sent the mail')
        },
        onError:(error)=>{
            toast.error(`Failed to hold the application ${error.message}`)
        }
    })
    return {pendingApplication,pendingLoading}
}