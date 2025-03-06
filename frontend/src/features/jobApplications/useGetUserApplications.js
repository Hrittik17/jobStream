import { useQuery } from "@tanstack/react-query";
import { getUserApplications } from "../../services/apiUser";

export function useGetUserApplications(){
    const {data,isLoading:userApplicationsLoading,isError:UserApplicationsError} = useQuery({
        queryKey:['myApplications'],
        queryFn:getUserApplications,
    })
    const UserApplications = data?.applications
    return {UserApplications,userApplicationsLoading,UserApplicationsError}
}