import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useJobStats } from './useJobStats';
import Loader from '../../ui/loader';
import NotFound from '../../ui/notFound';

export default function MonthlyApplicationsPieChart() {
    const { jobStats, jobStatsLoading } = useJobStats()

    if (jobStatsLoading) {
        return <Loader />
    }

    const { monthlyApplications } = jobStats

    if (!monthlyApplications || monthlyApplications.length === 0) {
        return <NotFound />
    }
    // const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042'];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Monthly Applications Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={monthlyApplications}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              label
            >
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
  