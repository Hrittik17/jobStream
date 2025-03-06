import { useQuery } from "@tanstack/react-query";
import { getClientAllRequests } from "../../services/apiContacts";

export function useGetClientAllRequests(){
    const {data:ClientRequests,isLoading:clientRequestsLoading,isError:clientRequestsError,refetch:clientRequestsRefetch} = useQuery({
        queryKey:['ClientRequests'],
        queryFn:getClientAllRequests
    })

    return {ClientRequests,clientRequestsLoading,clientRequestsError,clientRequestsRefetch}
}