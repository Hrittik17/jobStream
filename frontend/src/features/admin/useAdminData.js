import { useQuery } from "@tanstack/react-query";
import { getAdminData } from "../../services/apiAdmin";

export function useAdminData(){
    const {data:adminData,isLoading:adminDataLoading,error:adminDataError} = useQuery({
        queryKey:['Admin'],
        queryFn:getAdminData,
    })
    return {adminData,adminDataLoading,adminDataError}
}