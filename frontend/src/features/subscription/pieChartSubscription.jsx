import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#f8c3b2"];

export default function SubscriptionPieChart({ data }) {
    if (!data || data.length === 0) return <p>No data available for the pie chart.</p>;

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Subscriptions Distribution</h3>
            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="month"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#82ca9d"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}
