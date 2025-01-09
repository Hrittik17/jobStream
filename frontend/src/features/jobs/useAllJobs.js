import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllJobs } from "../../services/apiJobs";

export function useAllJobs(){
    const queryClient = useQueryClient()
    const {isLoading,data:AllJobs,error} = useQuery({
        queryKey:['jobs'],
        queryFn:getAllJobs,
        onError:(err)=>console.error('Error fetching all jobs',err)
    })
    return {isLoading,AllJobs,error}
}