import React from "react";
import { HiPower } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between px-12 py-8">
            <div className="flex text-2xl items-center space-x-14">
                <Link to="/" className="text-4xl font-bold text-white hover:text-bg-300 transition">
                    TTHelper
                </Link>
                <div className="flex space-x-8">
                    <Link to="/schedule" className="text-white hover:text-bg-300 transition">
                        Schedule
                    </Link>
                    <Link to="/courses" className="text-white hover:text-bg-300 transition">
                        Courses
                    </Link>
                    <Link to="/contact" className="text-white hover:text-bg-300 transition">
                        Contact
                    </Link>
                </div>
            </div>
            <button 
                onClick={handleLogout}
                className="flex items-center text-white text-2xl bg-bg-900 px-4 py-4 hover:text-bg-300 rounded-full transition-colors duration-300"
            >
                <HiPower className="mr-2 text-3xl" /> Log Out
            </button>
        </nav>
    );
};

export default Navbar;