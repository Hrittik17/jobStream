import { useMutation } from "@tanstack/react-query";
import { acceptContactRequests } from "../../services/apiContacts";
import toast from "react-hot-toast";

export function useAcceptContactRequests(){
    const {mutate:AcceptRequest,isLoading:acceptRequestLoading} = useMutation({
        mutationFn:(id)=> acceptContactRequests(id),
        onSuccess:()=> toast.success('Successfully accepted contact requests'),
        onError:(error)=> toast.error(error.message)
    })

    return {AcceptRequest,acceptRequestLoading}
}