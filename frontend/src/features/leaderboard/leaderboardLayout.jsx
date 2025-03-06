import BackButton from "../../ui/backButton"
import Loader from "../../ui/loader"
import { useGetLeaderboard } from "./useGetLeaderboard"

export default function LeaderboardLayout() {
    const { leaderboardData, leaderboardLoading, leaderboardRefetch } = useGetLeaderboard()

    if (leaderboardLoading) return <Loader />

    const sortedLeaderboardsData = leaderboardData.sort((a, b) => b.points - a.points)
    console.log(sortedLeaderboardsData)
    return (
        <>
            <BackButton />
            <div className="max-w-4xl mx-auto p-4 my-8 bg-white shadow-md rounded-lg">
                <h1 className="text-4xl font-bold italic mb-4 text-center">Leaderboard</h1>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2">Rank</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLeaderboardsData.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100`}
                            >
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{user.fullName}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
