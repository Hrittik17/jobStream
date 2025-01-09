import ChartContainer from "../features/stats/chartContainer"
import MonthlyApplicationsPieChart from "../features/stats/pieChart";
import StatsContainer from "../features/stats/statsContainer"
import { useJobStats } from "../features/stats/useJobStats"
import Loader from "../ui/loader"
import NotFound from "../ui/notFound";

export default function Stats() {
  const { jobStats, jobStatsLoading } = useJobStats()

  if (jobStatsLoading) {
    return <Loader />
  }

  // if(!jobStats){
  //   return <NotFound/>
  // }

  const { stats, monthlyApplications } = jobStats

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <StatsContainer />
      {monthlyApplications?.length > 0 && <ChartContainer />}
      {/* <MonthlyApplicationsPieChart /> */}
    </div>
  )
}
