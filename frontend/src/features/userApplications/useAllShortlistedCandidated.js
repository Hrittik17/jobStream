import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllShortlistedCandidates } from "../../services/apiJobs";

export function useAllShortlistedCandidates(){
    const {id} = useParams()
    const {data,isLoading:shortlistedLoading,refetch:shortlistedRefetch} = useQuery({
        queryKey:['shortlistedCandidates',id],
        queryFn:()=>{
            return getAllShortlistedCandidates(id)
        }
    })
    const shortlisted = data?.applications
    return {shortlisted,shortlistedLoading,shortlistedRefetch}
}