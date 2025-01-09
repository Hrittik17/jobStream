import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loader from "../../ui/loader";
import NotFound from "../../ui/notFound";
import { useJobStats } from "./useJobStats";

export default function AreaChart() {
    const { jobStats, jobStatsLoading } = useJobStats();

    if (jobStatsLoading) {
        return <Loader />;
    }

    if (!jobStats || jobStats.length === 0) {
        return <NotFound />;
    }

    const { monthlyApplications } = jobStats;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={monthlyApplications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
            </RechartsAreaChart>
        </ResponsiveContainer>
    );
}
