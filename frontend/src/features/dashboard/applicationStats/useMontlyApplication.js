import { useQuery } from "@tanstack/react-query";
import { userMontlyApplication } from "../../../services/apiUser";

export function useMontlyApplication(){
    const {data,isLoading:montlyApplicationLoading,refetch} = useQuery({
        queryKey:['montlyApplications'],
        queryFn:userMontlyApplication,
    })
    const montlyApplication = data?.monthlyApplications
    return {montlyApplication,montlyApplicationLoading,refetch}
}