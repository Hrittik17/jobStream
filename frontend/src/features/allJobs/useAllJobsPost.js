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
  console.log('search params', searchParams);
  const queryParams = Object.fromEntries(searchParams.entries());  // for the search bar i.e filters

  console.log('query params',queryParams)
  const { data: JobPosts, isLoading: jobPostLoading, error: jobPostError } = useQuery({
    queryKey: ["jobPosts", queryParams],
    queryFn: () => getAllJobsPosts(queryParams),
  });

  console.log('Job Posts', JobPosts);
  return { JobPosts, jobPostLoading, jobPostError };
}