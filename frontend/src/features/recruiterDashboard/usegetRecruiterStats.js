import { useQuery } from "@tanstack/react-query";
import { getRecruiterApplicationsStats } from "../../services/apiApplications";

export function useGetRecruiterStats(){
    const {data:RecruiterStats,isLoading:recruiterStatsLoading,isError:recruiterStatsError,refetch:recruiterStatsRefetch} = useQuery({
        queryKey:['RecruiterStats'],
        queryFn:()=> getRecruiterApplicationsStats()
    })

    return {RecruiterStats,recruiterStatsLoading,recruiterStatsError,recruiterStatsRefetch}
}