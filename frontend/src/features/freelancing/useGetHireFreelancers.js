import { useQuery } from "@tanstack/react-query";
import { getHireFreelancers } from "../../services/apiServices";


export function useGetHireFreelancers(){
   const {data:FreelancerHireRequests,isLoading:freelancerHireRequestsLoading,isError:freelancerHireRequestsError,refetch:freelancerHireRequestsRefetch} = useQuery({
    queryKey:['freelancerHireRequests'],
    queryFn:()=>getHireFreelancers()
   })

   return {FreelancerHireRequests,freelancerHireRequestsLoading,freelancerHireRequestsError,freelancerHireRequestsRefetch}
}