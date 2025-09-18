import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaUsers, FaBook, FaCog } from "react-icons/fa";
import AddUserPopup from "../components/AddUserPopup";

const Admin = () => {
    const [showAddUser, setShowAddUser] = useState(false);

    const handleAddUser = (userData) => {
        const token = localStorage.getItem('accessToken');
        let payload = {
            username: userData.username,
            password: userData.password,
            role: userData.role
        };

        // Add extra fields based on role
        if (userData.role === "student") {
            payload.student_id = userData.student_id;
        } else if (userData.role === "faculty") {
            payload.professor_id = userData.professor_id;
            payload.course_id = userData.course_id;
        }

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json().then(data => ({ status: res.status, data })))
        .then(({ status, data }) => {
            if (data.msg) {
                setMessage(data.msg);
            }
        })
        .catch(err => {
            setMessage("Error adding user.");
            console.error(err);
        });
        setShowAddUser(false);
    };

    const handleClosePopup = () => {
        setShowAddUser(false);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [_message, setMessage] = useState("");

    const handleGenerate = async () => {
        
        setIsLoading(true);
        setMessage("Generating timetable...");

        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch('http://localhost:5000/admin/generate-timetable', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.msg || "Timetable generated successfully!");
            } else {
                setMessage(data.msg || "Error generating timetable.");
            }
        } catch (error) {
            console.error("Generate timetable error:", error);
            setMessage("Network error. Could not generate timetable.");
        } finally {
            setIsLoading(false);
        }
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
                        <button onClick={handleGenerate} disabled={isLoading} className="bg-bg-600 hover:bg-bg-500 text-white text-4xl py-9 px-6 rounded-lg transition-colors flex flex-col items-center gap-3">
                            <FaBook size={96} />
                            {isLoading ? "Generating..." : "Generate Timetable"}
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