import { useQuery } from "@tanstack/react-query";
import { fetchUserSubscriptionStats } from "../../services/apiSubscription";

export function useUserSubscriptionStats() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["userSubscriptionStats"],
        queryFn: fetchUserSubscriptionStats,
    });

    return { data, isLoading, isError, error };
}
