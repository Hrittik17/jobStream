import { useMutation } from "@tanstack/react-query";
import { acceptResume } from "../../services/apiUser";
import toast from "react-hot-toast";

export function useAcceptApplication(){
    const {mutate:AcceptApplication,isLoading:acceptLoading} = useMutation({
        mutationFn:({_id,email})=>{
            return acceptResume(_id,email)
        },
        onSuccess:()=>{
            toast.success('Accepted the application and sent the user accepted mail')
        },
        onError:(error)=>{
            toast.error(`Failed to accept the application ${error.message}`)
        }
    })
    return {AcceptApplication,acceptLoading}
}