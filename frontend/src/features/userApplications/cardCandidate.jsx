import { useState } from "react";
import DatePicker from "react-datepicker";

export default function CandidateCard({ candidate, jobId }) {
    const [interviewDate, setInterviewDate] = useState(null); // State for date only
    const [interviewTime, setInterviewTime] = useState(""); // State for time only

    const handleSchedule = () => {
        if (!interviewDate || !interviewTime) {
            alert("Please select both a date and time for the interview.");
            return;
        }

        // Combine date and time into a single string
        const scheduledDateTime = `${interviewDate.toLocaleDateString()} ${interviewTime}`;
        alert(
            `Interview for ${candidate.userId.fullName} scheduled on ${scheduledDateTime} for Job ID: ${jobId}`
        );

        // Add logic to send the date and time to the server here
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-shadow flex flex-col space-y-4">
            {/* Candidate Info */}
            <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                    {candidate.userId.fullName}
                </h2>
                <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {candidate.userId.email}
                </p>
                <p className="text-blue-600 text-sm hover:underline">
                    <strong>Resume:</strong>{" "}
                    <a
                        href={candidate.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Resume
                    </a>
                </p>
                <p className="text-sm text-gray-500">
                    <strong>Applied At:</strong>{" "}
                    {new Date(candidate.appliedAt).toLocaleDateString()}
                </p>
            </div>

            {/* Schedule Section */}
            <div className="flex flex-col space-y-3">
                {/* Date Picker */}
                <DatePicker
                    selected={interviewDate}
                    onChange={(date) => setInterviewDate(date)}
                    className="border rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholderText="Select interview date"
                    dateFormat="MM/dd/yyyy"
                />

                {/* Time Selector */}
                <select
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select interview time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                </select>

                {/* Schedule Button */}
                <button
                    className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
                    onClick={handleSchedule}
                >
                    Schedule Interview
                </button>
            </div>
        </div>
    );
}
