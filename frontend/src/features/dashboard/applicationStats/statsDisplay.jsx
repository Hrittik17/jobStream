import Loader from "../../../ui/loader";
import { useApplicationsStats } from "../../jobApplications/jobApplicationsStats";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function StatsDisplay() {
    const { applicationStats, applicationsStatsLoading } = useApplicationsStats();

    if (applicationsStatsLoading) return <Loader />;

    const { Accepted, Pending, Rejected } = applicationStats.stats;

    const totalCount = Accepted + Pending + Rejected;

    const acceptedStats = Math.ceil((Accepted / totalCount) * 100);
    const pendingStats = Math.ceil((Pending / totalCount) * 100);
    const rejectedStats = Math.ceil((Rejected / totalCount) * 100);

    return (
        <>
            <h1 className="italic text-center font-bold text-2xl mb-6">Acceptance rate of your resume</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-100 rounded-lg shadow-md">
                {/* Accepted Card */}
                <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={acceptedStats}
                            text={`${acceptedStats}%`}
                            styles={buildStyles({
                                textColor: "#16a34a", // Green text color
                                pathColor: "#16a34a", // Green path color
                                trailColor: "#d1fae5", // Light green trail
                            })}
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Accepted</h3>
                    <p className="text-sm text-gray-500">Total: {Accepted}</p>
                </div>

                {/* Pending Card */}
                <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={pendingStats}
                            text={`${pendingStats}%`}
                            styles={buildStyles({
                                textColor: "#eab308", // Yellow text color
                                pathColor: "#eab308", // Yellow path color
                                trailColor: "#fef9c3", // Light yellow trail
                            })}
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
                    <p className="text-sm text-gray-500">Total: {Pending}</p>
                </div>

                {/* Rejected Card */}
                <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={rejectedStats}
                            text={`${rejectedStats}%`}
                            styles={buildStyles({
                                textColor: "#dc2626", // Red text color
                                pathColor: "#dc2626", // Red path color
                                trailColor: "#fee2e2", // Light red trail
                            })}
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Rejected</h3>
                    <p className="text-sm text-gray-500">Total: {Rejected}</p>
                </div>
            </div>
        </>
    );
}
