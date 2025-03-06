import { useQuery } from "@tanstack/react-query";
import { getUserServices } from "../../services/apiServices";

export function useUserServices(){
    const {data:userServices,isLoading:userServicesLoading,refetch:userServicesRefetch} = useQuery({
        queryKey:['userServices'],
        queryFn:getUserServices,
    })
    return {userServices,userServicesLoading,userServicesRefetch}
}