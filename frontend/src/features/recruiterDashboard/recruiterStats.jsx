import React from 'react'
import { useAllGetRecruiterStats } from './useAllGetRecruiterStats'
import { ComposedChart, LineChart, Line, XAxis, YAxis, Bar, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Loader from '../../ui/loader'
import NotFound from '../../ui/notFound'

export default function RecruiterStats() {
    const { data, resumesStatsLoading, resumesStatsError, resumesStatsRefetch } = useAllGetRecruiterStats()

    if (resumesStatsLoading) return <Loader />
    if (resumesStatsError) return <NotFound />

    const COLORS = ["#4CAF50", "#F44336", "#FFC107"]; // Green, Red, Yellow

    console.log('resumes stats:', data)

    const accepted = data.reduce((acc, curr) => acc + curr.accepted, 0)
    const rejected = data.reduce((acc, curr) => acc + curr.rejected, 0)
    const pending = data.reduce((acc, curr) => acc + curr.pending, 0)

    const piechartData = [
        { name: "Accepted", value: accepted },
        { name: "Pending", value: pending },
        { name: "Rejected", value: rejected }
    ];

    console.log('piechartData:', piechartData)

    console.log('accepted :', accepted, "rejected : ", rejected, "pending:", pending)

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Recruiter Statistics</h2>

            {/* Pie Chart */}
            <div className="flex justify-center items-center">
                <ResponsiveContainer width="80%" height={300}>
                    <PieChart>
                        <Pie
                            data={piechartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={3}
                            dataKey="value"
                            nameKey="name"
                        >
                            {piechartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>     
    );
}





















{/* Line & Bar Chart */ }
{/* <div className="mt-8">
                <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalResumes" fill="#8884d8" name="Total Resumes" />
                        <Area type="monotone" dataKey="accepted" fill="#82ca9d" stroke="#82ca9d" name="Accepted" />
                        <Line type="monotone" dataKey="rejected" stroke="#ff7300" name="Rejected" />
                        <Line type="monotone" dataKey="pending" stroke="#ffc658" name="Pending" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div> */}





{/* <div>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalResumes" fill="#8884d8" name="Total Resumes" />
                        <Area type="monotone" dataKey="accepted" fill="#82ca9d" stroke="#82ca9d" name="Accepted" />
                        <Line type="monotone" dataKey="rejected" stroke="#ff7300" name="Rejected" />
                        <Line type="monotone" dataKey="pending" stroke="#ffc658" name="Pending" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="accepted" stroke="#4CAF50" strokeWidth={2} name="Accepted" />
                        <Line type="monotone" dataKey="rejected" stroke="#F44336" strokeWidth={2} name="Rejected" />
                        <Line type="monotone" dataKey="pending" stroke="#FFC107" strokeWidth={2} name="Pending" />
                    </LineChart>
                </ResponsiveContainer>
            </div> */}