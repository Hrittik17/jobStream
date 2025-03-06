import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useApplicationsStats } from "../../jobApplications/jobApplicationsStats"
import Loader from "../../../ui/loader";

export default function MyApplicationStats() {
  const { applicationStats, applicationsStatsLoading, applicationStatsError } = useApplicationsStats()
  if (applicationsStatsLoading) return <Loader />
  console.log(applicationStats.stats)

  const data = [
    { name: "Accepted", value: applicationStats.stats.Accepted },
    { name: "Rejected", value: applicationStats.stats.Rejected },
    { name: "Pending", value: applicationStats.stats.Pending },
  ];

  const COLORS = ["#4caf50", "#f44336", "#3b45ff"]; // Green, Red, Yellow
  return (
    <div className=" bg-gray-100 rounded-lg shadow-md mb-4 py-8 px-4">
      <h3 className="text-xl italic text-center mb-4">Application Status</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          // outerRadius={100}
          outerRadius={120}
          cx='40%'
          cy='50%'
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend/>
      </PieChart>
    </div>
  )
}
