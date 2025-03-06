import { useQuery } from "@tanstack/react-query";
import { getAllUserApplicationsDetails } from "../../services/apiApplications";
// import { getAllApplicationUserDetails } from "../../services/apiJobs";

export function useGetAllApplicationUserDetails(){
    const {data:DashBoardApplications,isLoading:dashBoardApplicationsLoading,isError:dashBoardApplicationsError,refetch:dashBoardApplicationsRefetch} = useQuery({
        queryKey:['dashBoardApplications'],
        queryFn:()=>  getAllUserApplicationsDetails()    
    })

    return {DashBoardApplications,dashBoardApplicationsLoading,dashBoardApplicationsError,dashBoardApplicationsRefetch}
}