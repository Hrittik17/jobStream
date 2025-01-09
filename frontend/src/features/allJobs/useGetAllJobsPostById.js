
import { useQuery } from "@tanstack/react-query";
import { getAllJobPostDetails } from "../../services/apiJobs";
import { useParams } from "react-router-dom";

export function useGetAllJobPostById(){
    const { id } = useParams();
    console.log(id)

    const {data:jobPostDetails,isLoading:jobPostDetailsLoading,error} = useQuery({
        queryKey:['jobDetails',id],
        queryFn:()=>getAllJobPostDetails(id),
        retry: false,
    })
    return {jobPostDetails,jobPostDetailsLoading,error}
}