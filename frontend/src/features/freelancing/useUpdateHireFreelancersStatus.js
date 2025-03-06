import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHireFreelancersStatus } from "../../services/apiServices";
import toast from "react-hot-toast";

export function useUpdateHireFreelancersStatus(){
    const queryClient = useQueryClient();
    const {mutate:updateStatus,isLoading:updateStatusLoading} = useMutation({
        mutationFn:({ requestId, status })=>updateHireFreelancersStatus({ requestId, status }),
        onSuccess:()=>{
            toast.success("Hire request updated successfully!");
            queryClient.invalidateQueries(["freelancerHireRequests"]); // Refresh requests list
        },
        onError:(error)=> toast.error(error.message)
    })

    return {updateStatus,updateStatusLoading}
}