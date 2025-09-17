import React from "react";
import Navbar from "../components/Navbar";
import Timetable from "../components/Timetable";

const Admin = () => {
    return (
        <div className="min-h-screen bg-bg-800">
            <Navbar />
            <div className="px-12 py-8">
                <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
                <Timetable />
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">Admin Controls</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="bg-bg-600 hover:bg-bg-500 text-white py-3 px-6 rounded-lg transition-colors">
                            Manage Users
                        </button>
                        <button className="bg-bg-600 hover:bg-bg-500 text-white py-3 px-6 rounded-lg transition-colors">
                            Manage Courses
                        </button>
                        <button className="bg-bg-600 hover:bg-bg-500 text-white py-3 px-6 rounded-lg transition-colors">
                            System Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;