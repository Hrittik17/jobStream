import { useQuery } from "@tanstack/react-query";
import { fetchAdminSubscriptionStats } from "../../services/apiSubscription";

export function useAdminSubscriptionStats() {
    const { data: subscriptionStats, isLoading, isError, refetch:adminSubscriptionStatsRefetch } = useQuery({
        queryKey: ["AdminSubscriptionStats"],
        queryFn: fetchAdminSubscriptionStats,
    });

    return { subscriptionStats, isLoading, isError, adminSubscriptionStatsRefetch };
}