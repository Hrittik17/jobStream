import Loader from "../../ui/loader";
import { useUserSubscriptionStats } from "./useUserSubscriptionStats";
import SubscriptionBarChart from "./barChartSubscription";
import SubscriptionPieChart from "./pieChartSubscription";
import { useState } from "react";

export default function SubscriptionStatsPage() {
    const [showBarChart,setShowBarChart] = useState(false)
    const [showPieChart,setShowPieChart] = useState(false)
    const { data, isLoading, isError, error } = useUserSubscriptionStats();

    if (isLoading) return <Loader />;
    if (isError) return <p className="text-red-600">Error: {error.message}</p>;

    function displayBarChart(){
        setShowPieChart(false)
        setShowBarChart(true)
    }

    function displayPieChart(){
        setShowBarChart(false)
        setShowPieChart(true)
    }

    

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Subscription Stats</h2>
            <div className="flex gap-6">
                <button onClick={displayBarChart} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Bar Chart</button>
                <button onClick={displayPieChart} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pie Chart</button>
            </div>

            <div >  
               {showBarChart && <SubscriptionBarChart data={data} /> } 
                {showPieChart && <SubscriptionPieChart data={data} />}
            </div>
        </div>
    );
}


//className="grid grid-cols-1 gap-8"