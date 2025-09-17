import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginLanding = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                
                // If token is not expired, redirect to user's dashboard
                if (decodedToken.exp > currentTime) {
                    navigate(`/${decodedToken.role}`);
                } else {
                    // Token expired, remove it
                    localStorage.removeItem('accessToken');
                }
            } catch (error) {
                // Invalid token, remove it
                localStorage.removeItem('accessToken');
            }
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store the access token
                localStorage.setItem('accessToken', data.access_token);
                
                // Decode the token to get the role
                const decodedToken = jwtDecode(data.access_token);
                const userRole = decodedToken.role;
                
                // Navigate based on role using React Router
                navigate(`/${userRole}`);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-evenly min-h-screen bg-bg-800 font-main px-4">
            <h1 className="text-7xl font-extrabold mb-10 text-white tracking-wide drop-shadow-lg">
                TTHelper
            </h1>
            <div className="bg-bg-700 rounded-2xl shadow-2xl p-12 w-full max-w-xl flex flex-col items-center">
                <h2 className="text-3xl font-semibold mb-8 text-white text-center">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-white text-lg font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="py-3 px-4 rounded-xl bg-bg-600 text-white placeholder-gray-400 border border-bg-500 focus:border-bg-300 focus:outline-none transition-colors duration-200"
                            placeholder="Enter your username"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-white text-lg font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="py-3 px-4 rounded-xl bg-bg-600 text-white placeholder-gray-400 border border-bg-500 focus:border-bg-300 focus:outline-none transition-colors duration-200"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-center py-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="py-4 rounded-xl text-white text-xl font-bold text-center transition-colors duration-200 bg-bg-600 hover:bg-bg-500 disabled:bg-bg-800 disabled:cursor-not-allowed shadow-md w-full"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginLanding;