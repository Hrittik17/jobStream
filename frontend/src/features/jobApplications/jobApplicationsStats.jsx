// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useGetUserApplications } from './useGetUserApplications';
// import Loader from '../../ui/loader';
// import { useApplicationsStats } from './jobApplicationsStats';

// export default function JobApplicationsStats() {
//     const { formattedData, applicationsStatsLoading, applicationStatsError } = useApplicationsStats()
//     if (applicationsStatsLoading) {
//         return <Loader />
//     }
//     return (
//         <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={formattedData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
//                 <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
//             </LineChart>
//         </ResponsiveContainer>
//     );
// }
