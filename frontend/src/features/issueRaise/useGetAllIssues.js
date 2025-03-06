import { useQuery } from "@tanstack/react-query";
import { getAllIssues } from "../../services/apiIssues";

export function useGetAllIssues(){
    const {data,isLoading:issuesLoading,refetch:issuesRefetch,isError:issuesError} = useQuery({
        queryKey:['Issues'],
        queryFn:getAllIssues,
    })

    return {data,issuesLoading,issuesRefetch,issuesError}
}