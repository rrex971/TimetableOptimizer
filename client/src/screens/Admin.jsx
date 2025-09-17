import React from "react";
import Navbar from "../components/Navbar";
import { FaUsers, FaBook, FaCog } from "react-icons/fa";

const Admin = () => {
    return (
        <div className="min-h-screen bg-bg-800">
            <Navbar role="admin"/>
            <div className="px-12 py-8">
                <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">Admin Controls</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="bg-bg-600 hover:bg-bg-500 text-white text-4xl py-9 px-6 rounded-lg transition-colors flex flex-col items-center gap-3">
                            <FaUsers size={96} />
                            Manage Users
                        </button>
                        <button className="bg-bg-600 hover:bg-bg-500 text-white text-4xl py-9 px-6 rounded-lg transition-colors flex flex-col items-center gap-3">
                            <FaBook size={96} />
                            Generate Next Timetable
                        </button>
                        <button className="bg-bg-600 hover:bg-bg-500 text-white text-4xl py-9 px-6 rounded-lg transition-colors flex flex-col items-center gap-3">
                            <FaCog size={96} />
                            System Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;