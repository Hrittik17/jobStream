import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../services/apiJobs";

export function useAllJobs(){
    const {data:AllJobs,isLoading:allJobsLoading} = useQuery({
        queryKey:['Jobs'],
        queryFn:getAllJobs,
    })
    return {AllJobs,allJobsLoading}
}