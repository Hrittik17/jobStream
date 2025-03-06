import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMontlyApplication } from "./useMontlyApplication";
import Loader from "../../../ui/loader";


export default function UserApplicationBarChart() {
    const {montlyApplication,montlyApplicationLoading,refetch} = useMontlyApplication()
    if(montlyApplicationLoading) return <Loader/>
  return (
    <div className="chart-container" style={{ width: "100%", height: "400px" }}>
            <h2 className="text-center text-lg font-semibold mb-4">Job Applications by Month</h2>
            <ResponsiveContainer>
                <BarChart data={montlyApplication} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
  )
}

