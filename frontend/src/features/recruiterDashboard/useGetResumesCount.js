import { useQuery } from "@tanstack/react-query";
import { getResumesCount } from "../../services/apiApplications";

export function useGetResumesCount(){
    const {data:ResumeCount,isLoading:resumeCountLoading,isError:resumeCountError,refetch:resumeCountRefetch} = useQuery({
        queryKey:['ResumesCount'],
        queryFn:()=>getResumesCount()
    })

    return {ResumeCount,resumeCountLoading,resumeCountError,resumeCountRefetch}
}