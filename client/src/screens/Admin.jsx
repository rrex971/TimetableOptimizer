import React from "react";
import Navbar from "../components/Navbar";
import { FaUsers, FaBook, FaCog } from "react-icons/fa";
import { useState } from "react";
import AddUserPopup from "../components/AddUserPopup";

const Admin = () => {
    const [showAddUser, setShowAddUser] = useState(false);

    const handleAddUser = (userData) => {
        // Here you would typically make an API call to add the user
        console.log('Adding user:', userData);
        // For now, just close the popup
        setShowAddUser(false);
        // TODO: Add API call to create user
    };

    const handleClosePopup = () => {
        setShowAddUser(false);
    };

    return (
        <div className="min-h-screen bg-bg-800">
            <Navbar role="admin"/>
            <div className="px-12 py-8">
                <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">Admin Controls</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            className="bg-bg-600 hover:bg-bg-500 text-white text-4xl py-9 px-6 rounded-lg transition-colors flex flex-col items-center gap-3"
                            onClick={() => setShowAddUser(true)}
                        >
                            <FaUsers size={96} />
                            Manage Users
                        </button>
                        <button className="bg-bg-600 hover:bg-bg-500 text-white text-4xl py-9 px-6 rounded-lg transition-colors flex flex-col items-center gap-3">
                            <FaBook size={96} />
                            Generate Next Timetable
                        </button>
                    </div>
                </div>
            </div>
            <AddUserPopup 
                isOpen={showAddUser}
                onClose={handleClosePopup}
                onSubmit={handleAddUser}
            />
        </div>
    );
};

export default Admin;