import { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import MonthlyApplicationsPieChart from "./pieChart";
import UserLineChart from "./lineChart";

export default function ChartContainer() {
  // const [barChart, setBarChart] = useState(true)
  const [showLineChart, setShowLineChart] = useState(false)
  const [showBarChart, setShowBarChart] = useState(false)
  const [showAreaChart, setShowAreaChart] = useState(false)

  function displayLineChart() {
    setShowAreaChart(false)
    setShowBarChart(false)
    setShowLineChart(true)
  }

  function displayAreaChart() {
    setShowAreaChart(true)
    setShowBarChart(false)
    setShowLineChart(false)
  }

  function displayBarChart() {
    setShowAreaChart(false)
    setShowBarChart(true)
    setShowLineChart(false)
  }

  return (
    <div className="mt-8 ">
      <h1 className="mb-6 text-xl">Applications Per Months</h1>
      <div className="flex gap-6 mb-8">
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={displayLineChart}>
          Line Chart
        </button>
        <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={displayAreaChart}>
          Area Chart
        </button>
        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={displayBarChart}>
          Bar Chart
        </button>
      </div>
      <div>
        {showLineChart && <UserLineChart />}
      </div>
      <div>
        {showAreaChart && <AreaChart />}
      </div>
      <div>
        {showBarChart && <BarChart />}
      </div>
    </div>
  )
}
