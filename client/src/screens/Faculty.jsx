import React from "react";
import Navbar from "../components/Navbar";
import Timetable from "../components/Timetable";

const Faculty = () => {
    return (
        <div className="min-h-screen bg-bg-800">
            <Navbar />
            <div className="px-12 py-8">
                <h1 className="text-4xl font-bold text-white mb-8">Faculty Dashboard</h1>
            </div>
        </div>
    );
};

export default Faculty;