import React from "react";
import { HiPower } from "react-icons/hi2";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-12 py-8">
            <div className="flex text-2xl items-center space-x-14">
                <div className="text-4xl font-bold text-white">TTHelper</div>
                <div className="flex space-x-8">
                    <button className="text-white hover:text-bg-300 transition">Schedule</button>
                    <button className="text-white hover:text-bg-300 transition">Courses</button>
                    <button className="text-white hover:text-bg-300 transition">Contact</button>
                </div>
            </div>
            <button className="flex items-center text-white text-2xl bg-bg-900 px-4 py-4 hover:text-bg-300 rounded-full transition-colors duration-300">
                <HiPower className="mr-2 text-3xl" /> Log Out
            </button>
        </nav>
    );
};

export default Navbar;