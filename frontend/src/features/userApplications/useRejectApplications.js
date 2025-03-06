import { useMutation } from "@tanstack/react-query";
import { acceptResume, rejectResume } from "../../services/apiUser";
import toast from "react-hot-toast";

export function useRejectApplication(){
    const {mutate:rejectApplication,isLoading:rejectLoading} = useMutation({
        mutationFn:({_id,email})=>{
            return rejectResume(_id,email)
        },
        onSuccess:()=>{
            toast.success('Rejected the application and sent the mail')
        },
        onError:(error)=>{
            toast.error(`Failed to reject the application ${error.message}`)
        }
    })
    return {rejectApplication,rejectLoading}
}