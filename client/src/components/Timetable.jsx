import React, { useState, useEffect } from "react";
import FeedbackPopup from "../screens/FeedbackPopup";
import { jwtDecode } from "jwt-decode";

const Timetable = () => {
    const [scheduleData, setScheduleData] = useState(null);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [userName, setUserName] = useState("User");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayIndex = new Date().getDay();
    const days = [...daysOfWeek.slice(todayIndex), ...daysOfWeek.slice(0, todayIndex)];

    const getTodayName = () => {
        const today = new Date();

        return daysOfWeek[today.getDay()];
    };

    const isToday = (day) => {
        return day === getTodayName();
    };

    useEffect(() => {
        const fetchTimetable = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error("No authorization token found. Please log in again.");
                }

                try {
                    const decodedToken = jwtDecode(token);
                    
                    const name = decodedToken.sub; 

                    if (name && typeof name === 'string') {
                        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
                    } else {
                        setUserName("User"); 
                    }

                } catch (decodeError) {
                    console.error("Error decoding token:", decodeError);
                }

                const response = await fetch('http://localhost:5000/api/my-timetable', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || "Failed to fetch timetable.");
                }

                const data = await response.json();
                console.log("Fetched timetable data:", data);
                setScheduleData(data);

            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTimetable();
    }, []); 


    if (isLoading) {
        return (
            <div className="bg-bg-800 px-12 min-h-screen text-white text-3xl text-center pt-20">
                Loading your schedule...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-bg-800 px-12 min-h-screen text-red-400 text-3xl text-center pt-20">
                Error: {error}
            </div>
        );
    }
    
    if (!scheduleData) {
        return (
             <div className="bg-bg-800 px-12 min-h-screen text-white text-3xl text-center pt-20">
                No schedule data found.
            </div>
        )
    }

    return (
        <div className="bg-bg-800 px-12 min-h-screen">

            <div className="flex justify-between">
                <div className="mb-6">
                    <h1 className="text-6xl font-bold text-white mb-2">Hello, {userName}</h1>
                    <p className="text-bg-300 text-4xl">
                        Today is a <span className="font-semibold text-white">{getTodayName()}</span>
                    </p>
                    
                </div>
                <button
                    className="bg-teal-500 text-2xl font-bold hover:bg-teal-600 text-white h-fit px-4 py-2 rounded-2xl transition-colors"
                    onClick={() => setFeedbackOpen(true)}
                >
                    Timetable Feedback
                </button>
            </div>

            <div className="overflow-x-auto timetable-scroll">
                <div className="flex gap-4 min-w-max pb-4">
                    {days.map((day) => (
                        <div
                            key={day}
                            className='flex-shrink-0 w-128 h-lvh rounded-lg p-4'
                        >
                            <div className="text-left mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {day}
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {scheduleData[day] && scheduleData[day].length > 0 ? (
                                    scheduleData[day].map((classItem, index) => (
                                        <div
                                            key={index}
                                            className={`${isToday(day) ? 'bg-bg-500' : 'bg-bg-700'} text-white p-3 rounded-md shadow-sm`}
                                        >
                                            {console.log(classItem)}
                                            <div className="text-sm font-medium mb-1">{classItem.time}</div>
                                            <div className="font-semibold">{classItem.subject}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-bg-300 italic py-8">
                                        No classes today
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        <FeedbackPopup open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
    );
};

export default Timetable;