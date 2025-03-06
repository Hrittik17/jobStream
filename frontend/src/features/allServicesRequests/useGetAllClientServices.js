import { useQuery } from "@tanstack/react-query";
import { getClientServicesRequests } from "../../services/apiServices";

export function useGetAllClientServices(){
    const {data:ClientServicesRequests,isLoading:clientServicesRequestsLoading,isError:clientServicesRequestsError,refetch:clientServicesRequestsRefetch} = useQuery({
        queryKey:['ClientServicesRequests'],
        queryFn:()=>getClientServicesRequests()
    })

    return {ClientServicesRequests,clientServicesRequestsLoading,clientServicesRequestsError,clientServicesRequestsRefetch}
}