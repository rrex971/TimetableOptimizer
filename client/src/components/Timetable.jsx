import React from "react";

const Timetable = () => {
    const days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];

    const subjects = ["BCSE201L", "BCSE204L", "BCSE355L", "BCSE102L"];
    const getRandomSubject = () => subjects[Math.floor(Math.random() * subjects.length)];

    const scheduleData = {
        "Friday": [
            { time: "9:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "10:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "11:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "12:00 PM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "2:00 PM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "3:00 PM", subject: getRandomSubject(), color: "bg-bg-700" }
        ],
        "Saturday": [
            { time: "8:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "10:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "12:00 PM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "2:00 PM", subject: getRandomSubject(), color: "bg-bg-700" }
        ],
        "Sunday": [
            { time: "9:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "11:00 AM", subject: getRandomSubject(), color: "bg-bg-700" }
        ],
        "Monday": [
            { time: "8:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "9:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "10:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "11:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "1:00 PM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "3:00 PM", subject: getRandomSubject(), color: "bg-bg-700" }
        ],
        "Tuesday": [
            { time: "9:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "10:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "11:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "1:00 PM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "3:00 PM", subject: getRandomSubject(), color: "bg-bg-700" }
        ],
        "Wednesday": [
            { time: "8:00 AM", subject: getRandomSubject(), color: "bg-bg-400" },
            { time: "9:50 AM", subject: getRandomSubject(), color: "bg-bg-400" },
            { time: "11:00 AM", subject: getRandomSubject(), color: "bg-bg-400" },
            { time: "12:00 PM", subject: getRandomSubject(), color: "bg-bg-400" },
            { time: "2:00 PM", subject: getRandomSubject(), color: "bg-bg-400" }
        ],
        "Thursday": [
            { time: "9:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "10:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            { time: "11:00 AM", subject: getRandomSubject(), color: "bg-bg-700" },
            // Two continuous hours of BCSE204P
            { time: "1:00 PM", subject: "BCSE204P", color: "bg-bg-700" },
            { time: "2:00 PM", subject: "BCSE204P", color: "bg-bg-700" },
            { time: "3:00 PM", subject: getRandomSubject(), color: "bg-bg-700" }
        ]
    };

    const getTodayName = () => {
        const today = new Date();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[today.getDay()];
    };

    const isToday = (day) => {
        return day === getTodayName();
    };

    return (
        <div className="bg-bg-800 px-12 min-h-screen">

            <div className="flex justify-between">
                <div className="mb-6">
                    <h1 className="text-6xl font-bold text-white mb-2">Hello, Student</h1>
                    <p className="text-bg-300 text-4xl">
                        Today is a <span className="font-semibold text-white">{getTodayName()}</span>
                    </p>
                    
                </div>
                <button className="bg-teal-500 text-2xl font-bold hover:bg-teal-600 text-white h-fit px-4 py-2 rounded-2xl transition-colors">
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
                            {/* Day Header */}
                            <div className="text-left mb-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {day}
                                </h3>
                            </div>

                            {/* Classes for the day */}
                            <div className="space-y-3">
                                {scheduleData[day] && scheduleData[day].length > 0 ? (
                                    scheduleData[day].map((classItem, index) => (
                                        <div
                                            key={index}
                                            className={`${classItem.color} text-white p-3 rounded-md shadow-sm`}
                                        >
                                            {classItem.isSpecial ? (
                                                <div className="text-center">
                                                    <div className="text-xl font-bold">{classItem.subject}</div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="text-sm font-medium mb-1">{classItem.time}</div>
                                                    <div className="font-semibold">{classItem.subject}</div>
                                                </>
                                            )}
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
        </div>
    );
};

export default Timetable;
