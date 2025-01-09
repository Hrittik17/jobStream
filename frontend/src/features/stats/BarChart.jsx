import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loader from "../../ui/loader";
import NotFound from "../../ui/notFound";
import { useJobStats } from "./useJobStats";

export default function BarChart() {
    const { jobStats, jobStatsLoading } = useJobStats()

    if (jobStatsLoading) {
        return <Loader />
    }

    const { monthlyApplications } = jobStats

    if (!monthlyApplications || monthlyApplications.length === 0) {
        return <NotFound />
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
            </RechartsBarChart>
        </ResponsiveContainer>
    )
}
