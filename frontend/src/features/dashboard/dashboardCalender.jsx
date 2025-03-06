import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardCalendar = () => {  // Function component syntax corrected here
    const [date, setDate] = useState(new Date());

    const onChangeDate = (newDate) => {
        setDate(newDate);
        console.log(newDate);
    };

    return (
        <div className=" bg-gray-100 rounded-lg shadow-md mb-4 py-8 px-4">
            <h2 className='text-xl text-center mb-4 italic'>Calender</h2>
            <Calendar
                onChange={onChangeDate}
                value={date}
            />
        </div>
    );
};

export default DashboardCalendar; // Ensure you're exporting correctly
