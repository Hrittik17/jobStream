import { useQuery } from "@tanstack/react-query";
import { getAllRequests } from "../../services/apiContacts";

export function useAllContactsRequests(){
    const {data:AllContactsRequests,isLoading:allContactsRequestLoading,isError:allContactsRequestsError,refetch:allContactsRequestsRefetch} = useQuery({
        queryKey:['AllRequests'],
        queryFn:getAllRequests
    })

    return {AllContactsRequests,allContactsRequestLoading,allContactsRequestsError,allContactsRequestsRefetch}
}