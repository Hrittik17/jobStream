import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function SubscriptionBarChart({ data }) {
    if (!data || data.length === 0) return <p>No data available for the bar chart.</p>;

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Subscriptions</h3>
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="month" stroke="#333" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
