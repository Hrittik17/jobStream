import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Loader from "../../ui/loader";
import NotFound from "../../ui/notFound";
import { useJobStats } from "./useJobStats";
export default function UserLineChart() {

    const { jobStats, jobStatsLoading } = useJobStats()

    if (jobStatsLoading) {
        return <Loader />
    }

    const { monthlyApplications } = jobStats

    if (!monthlyApplications || monthlyApplications.length === 0) {
        return <NotFound />
    }
  return (
   <div className="chart-container" style={{ width: "100%", height: "400px" }}>
               <h2 className="text-center text-lg font-semibold mb-4">Job Applications by Month</h2>
               <ResponsiveContainer>
                   <LineChart data={monthlyApplications} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="date" />
                       <YAxis />
                       <Tooltip />
                       <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                   </LineChart>
               </ResponsiveContainer>
           </div>
  )
}
