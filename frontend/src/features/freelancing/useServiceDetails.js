import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getServiceDetails } from "../../services/apiServices";

export function useServiceDetails(){
    const {id} = useParams()

    const {data,isLoading:serviceDetailsLoading,refetch:serviceRefetch} = useQuery({
        queryKey:['serviceDetails',id],
        queryFn:()=>{
            return getServiceDetails(id)
        }
    })
    const serviceDetails = data?.servicesDetails
    return {serviceDetails,serviceDetailsLoading,serviceRefetch}
}
