import { useQuery } from "@tanstack/react-query";
import { getJobDetails } from "../../services/apiJobs";
import { useParams } from "react-router-dom";

export function useJobDetails(){
    const { id } = useParams();
    console.log(id)

    const {data:jobDetails,isLoading:jobDetailsLoading} = useQuery({
        queryKey:['jobDetails',id],
        queryFn:()=>getJobDetails(id),
        retry: false,
    })
    return {jobDetails,jobDetailsLoading}
}