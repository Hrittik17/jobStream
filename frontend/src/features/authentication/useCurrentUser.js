import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useCurrentUser(){
    // const queryClient =  useQueryClient
    const {data,isLoading:currentUserLoading,isError:currentUserError,refetch:currentUserRefetch} = useQuery({
        queryKey:['User'],
        queryFn:getCurrentUser,

    })
     // Extract the currentUser from the API response
     const currentUser = data?.currentUser; // Access currentUser from the response
     const message = data?.message; // Optionally, access the message
    return {currentUser,currentUserLoading,currentUserError,message,currentUserRefetch}
}