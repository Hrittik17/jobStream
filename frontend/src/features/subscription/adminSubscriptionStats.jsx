import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Area, ComposedChart } from "recharts";
import { PieChart, Pie, Cell, LineChart, Line } from "recharts";
import Loader from "../../ui/loader";
import NotFound from "../../ui/notFound";
import { useAdminSubscriptionStats } from "./useAdminSubscriptionStats";

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#e11d48", "#14b8a6", "#a855f7", "#facc15"];

export default function AdminSubscriptionChart() {
    const { subscriptionStats, isLoading, isError, adminSubscriptionStatsRefetch } = useAdminSubscriptionStats();
    const [showLineChart,setShowLineChart] = useState(true)
    const [showPieChart,setShowPieChart] = useState(false)
    const [showBarChart,setShowBarChart] = useState(false)
    const [showComposedChart,setShowComposedChart] = useState(false)

    if (isLoading) return <Loader />;
    if (isError) return <NotFound />;

    function showPieChartHandler(){
        setShowPieChart(true)
        setShowLineChart(false)
        setShowBarChart(false)
        setShowComposedChart(false)
    }

    function showLineChartHandler(){
        setShowPieChart(false)
        setShowLineChart(true)
        setShowBarChart(false)
        setShowComposedChart(false)
    }

    function showBarChartHandler(){
        setShowPieChart(false)
        setShowLineChart(false)
        setShowBarChart(true)
        setShowComposedChart(false)
    }

    function ShowComposedChartHandler(){
        setShowPieChart(false)
        setShowLineChart(false)
        setShowBarChart(false)
        setShowComposedChart(true)

    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <div className="flex justify-between">

                <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Subscription Purchases</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={() => adminSubscriptionStatsRefetch()}>
                    Refresh
                </button>
            </div>

            <div className="flex gap-2 mb-4">
                <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                 onClick={showLineChartHandler}>Line Chart</button>
                <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' 
                onClick={showPieChartHandler}>Pie Chart</button>
                <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' 
                onClick={showBarChartHandler}>Bar Chart</button>
                <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' 
                onClick={ShowComposedChartHandler}>Composed Chart</button>
            </div>

            {/* Bar Chart */}
            {showBarChart && (<div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Subscriptions Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subscriptionStats} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>)}

            {/* Line Chart */}
            {showLineChart && (<div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Subscriptions Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={subscriptionStats} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>)}

            {/* Pie Chart */}
            {showPieChart && (<div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Subscription Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={subscriptionStats} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={100} innerRadius={55} fill="#8884d8" label>
                            {subscriptionStats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>)}

               {/* Composed Chart */}
               {showComposedChart && (
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Subscriptions Composed Chart</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={subscriptionStats} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                            <Area type="monotone" dataKey="count" fill="#f97316" stroke="#f97316" opacity={0.3} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
