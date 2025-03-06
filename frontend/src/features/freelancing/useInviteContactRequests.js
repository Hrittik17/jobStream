import { useMutation, useQuery } from "@tanstack/react-query";
import { inviteContactRequests } from "../../services/apiContacts";
import toast from "react-hot-toast";

export function useInviteContactRequests(){
    const {mutate:SendContactRequests,isLoading:sendContactRequestsLoading,isError:sendContactRequestsError} = useMutation({
        mutationFn:({ friendEmail, serviceId })=> inviteContactRequests(friendEmail, serviceId),
        onSuccess:()=> toast.success('Successfully send the Contact Requests'),
        onError:(error)=> toast.error(error?.message)         
    })

    return {SendContactRequests,sendContactRequestsLoading,sendContactRequestsError}
}