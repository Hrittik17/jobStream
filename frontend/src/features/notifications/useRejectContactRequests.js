import { useMutation } from "@tanstack/react-query";
import { rejectContactRequests } from "../../services/apiContacts";
import toast from "react-hot-toast";

export function useRejectContactRequests(){
    const {} = useMutation({
        mutationFn:(id)=> rejectContactRequests(id),
        onSuccess:()=> toast.success("Successfully rejected contact request"),
        onError:(error)=> toast.error(error.message)

    })
}