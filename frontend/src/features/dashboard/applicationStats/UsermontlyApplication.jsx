import Loader from "../../../ui/loader";
import { useMontlyApplication } from "./useMontlyApplication"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


export default function UserMontlyApplication() {
    const {montlyApplication,montlyApplicationLoading,refetch} = useMontlyApplication()
    if(montlyApplicationLoading) return <Loader/>
    console.log(montlyApplication)
  return (
    <div className="chart-container" style={{ width: "100%", height: "400px" }}>
            <h2 className="text-center text-lg font-semibold mb-4">Job Applications by Month</h2>
            <ResponsiveContainer>
                <LineChart data={montlyApplication} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
