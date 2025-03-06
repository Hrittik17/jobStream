import { useQuery } from "@tanstack/react-query";
import { getUserApplicationsStats } from "../../services/apiUser";

export function useApplicationsStats(){
    const { data:applicationStats, isLoading:applicationsStatsLoading, isError:applicationStatsError } = useQuery({
        queryKey: ['applicationsStats'],
        queryFn: getUserApplicationsStats,
    });

    return {applicationStats,applicationsStatsLoading,applicationStatsError}
}