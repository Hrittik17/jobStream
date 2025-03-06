import { useQuery } from "@tanstack/react-query";
import { getUserSubscription } from "../../services/apiSubscription";

export function useGetUserSubscription(){
    const {data,isLoading:subscriptionLoading,refetch:subscriptionRefetch} = useQuery({
        queryKey:['userSubscription'],
        queryFn:getUserSubscription
    })
    const subscriptions = data?.subscriptions
    return {subscriptions,subscriptionLoading,subscriptionRefetch}
}