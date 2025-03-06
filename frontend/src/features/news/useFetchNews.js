import { useQuery } from "@tanstack/react-query";
import { getNewsData } from "../../services/apiNews";

export function useFetchNews(){
    const {data:news,isLoading:newsLoading,refetch:newsRefetch} = useQuery({
        queryKey:['news'],
        queryFn:getNewsData
    })
    return {news,newsLoading,newsRefetch}
}