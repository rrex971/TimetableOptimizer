import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
        return <Navigate to="/" replace />;
    }
    
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('accessToken');
            return <Navigate to="/" replace />;
        }
        
        if (requiredRole && decodedToken.role !== requiredRole) {
            return <Navigate to={`/${decodedToken.role}`} replace />;
        }
        
        return children;
    } catch (error) {
        localStorage.removeItem('accessToken');
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;