import Loader from "../../ui/loader";
import { useStatsForSpecificApplication } from "./useStatsForSpecificJob";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function JobApplicationStats() {
    const { applicationStats, applicationStatsLoading } = useStatsForSpecificApplication();
    
    if (applicationStatsLoading) return <Loader />;
    if (!applicationStats?.stats) return <p>No stats available</p>; // Check for missing stats
    
    const chartData = applicationStats.stats.map(stat => ({
        month: stat.month,   // Use the month string (e.g., "Jan")
        count: stat.count,   // Use the count number
    }));

    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>  {/* Pass the correct data */}
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
