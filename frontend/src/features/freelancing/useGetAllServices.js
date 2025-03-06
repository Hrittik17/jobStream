import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../../services/apiServices";

export function useGetAllServices(){
    const {data,isLoading:servicesLoading,refetch:servicesRefetch} = useQuery({
        queryKey:['allServices'],
        queryFn:getAllServices,
    })
    const Services = data?.servicesPost
    return {Services,servicesLoading,servicesRefetch}
}