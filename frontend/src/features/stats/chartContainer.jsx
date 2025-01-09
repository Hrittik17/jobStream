import { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import MonthlyApplicationsPieChart from "./pieChart";

export default function ChartContainer() {
    const [barChart, setBarChart] = useState(true)
  
    return (
      <div className="mt-8">
        <button
          type="button"
          onClick={() => setBarChart(!barChart)}
          className="bg-blue-600 text-white py-2 px-4 rounded-full transition transform hover:scale-105"
        >
          {barChart ? 'Switch to Area Chart' : 'Switch to Bar Chart'}
        </button>
        <div className="mt-6">
          {barChart ? <BarChart /> : <AreaChart />}
        </div>
      </div>
    )
  }
  