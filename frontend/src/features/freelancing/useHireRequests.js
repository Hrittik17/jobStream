import { useMutation } from "@tanstack/react-query";
import { createHireRequest } from "../../services/apiServices";
import toast from "react-hot-toast";

export function useHireRequests(){
    const {mutate:HireRequest,isLoading:hireRequestLoading,isError:hireRequestError} = useMutation({
        mutationFn:(hireData)=>createHireRequest(hireData),
        onSuccess:()=> toast.success("Hire request sent successfully!"),
        onError:(error)=> toast.error(error.message)
    })

    return {HireRequest,hireRequestLoading,hireRequestError}
}