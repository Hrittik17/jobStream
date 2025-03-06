import { useQuery } from "@tanstack/react-query";
import { fetchAllSubscriptions } from "../../services/apiSubscription";

export function useGetAllSubscriptions(){
    const {data,isLoading:subscriptionLoading,refetch:subscriptionRefetch,isError:subscriptionError} = useQuery({
        queryKey:['AllSubscriptions'],
        queryFn:fetchAllSubscriptions,
    })

    return {data,subscriptionLoading,subscriptionRefetch,subscriptionError}
}