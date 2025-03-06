import { useQuery } from "@tanstack/react-query";
import { getRecruiterStats } from "../../services/apiApplications";

export function useAllGetRecruiterStats(){
    const {data,isLoading:resumesStatsLoading,isError:resumesStatsError,refetch:resumesStatsRefetch} = useQuery({
        queryKey:['ResumesStats'],
        queryFn:()=>getRecruiterStats()
    })

    return {data,resumesStatsLoading,resumesStatsError,resumesStatsRefetch}
}