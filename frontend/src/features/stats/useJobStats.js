import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobsStats } from "../../services/apiJobs";

export function useJobStats(){
    const {data:jobStats,isLoading:jobStatsLoading} = useQuery({
        queryKey:['jobStats'],
        queryFn:getJobsStats,
    })
    // const {stats,monthlyApplications} = jobsStats
    return{jobStats,jobStatsLoading}
}
    