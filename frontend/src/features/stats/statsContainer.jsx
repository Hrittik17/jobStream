import { useJobStats } from './useJobStats';
import Loader from '../../ui/loader';
import StatItem from './statItem';
import { FaSuitcaseRolling } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa6';
import { FaBug } from 'react-icons/fa';

export default function StatsContainer() {
  const { jobStats, jobStatsLoading } = useJobStats();

  if (jobStatsLoading) {
    return <Loader />;
  }

  const { stats } = jobStats;

  const statsList = [
    {
      title: 'Accepted Job Stats',
      count: stats?.Accepted || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'Pending Job Stats',
      count: stats?.Pending || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Rejected Job Stats',
      count: stats?.Rejected || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#fef3c7',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
      {statsList.map((stat) => (
        <StatItem key={stat.title} statList={stat} />
      ))}
    </div>
  );
}
