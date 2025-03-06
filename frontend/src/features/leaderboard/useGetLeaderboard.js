import { useQuery } from "@tanstack/react-query";
import { getLeadersBoard } from "../../services/apiLeaderboard";

export function useGetLeaderboard(){
    const {data,isLoading:leaderboardLoading,refetch:leaderboardRefetch} = useQuery({
        queryKey:['leaderboard'],
        queryFn:getLeadersBoard,
    })
    const leaderboardData = data?.allUsers
    return {leaderboardData,leaderboardLoading,leaderboardRefetch}
}