import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllJobsPosts } from "../../services/apiJobs";

// export function useGetAllJobsPost(){
//     // const queryClient = useQueryClient()
//     const {data:JobPosts,isLoading:jobPostLoading,error:jobPostError} = useQuery({
//         queryKey:['jobPosts'],
//         queryFn:getAllJobsPosts,
//     })
//     return {JobPosts,jobPostLoading,jobPostError}
// }

import { useSearchParams } from "react-router-dom";

export function useGetAllJobsPost() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const { data: JobPosts, isLoading: jobPostLoading, error: jobPostError } = useQuery({
    queryKey: ["jobPosts", queryParams],
    queryFn: () => getAllJobsPosts(queryParams),
  });

  return { JobPosts, jobPostLoading, jobPostError };
}