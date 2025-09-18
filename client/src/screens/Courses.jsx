import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);


    

    useEffect(() => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No authorization token found. Please log in again.");
            }
            fetch("http://localhost:5000/courses", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
        } catch (error) {
            console.error(error);
            return <div className="text-white">Error loading courses.</div>;
        }
        
    }, []);


    if (loading) {
        return <div className="text-white">Loading courses...</div>;
    }
    return (
        <div className="bg-bg-700 rounded-lg">
            <Navbar />
            <table className="min-w-5/6 text-white mx-12 py-12">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Course ID</th>
                        <th className="px-4 py-2 text-left">Course Name</th>
                        <th className="px-4 py-2 text-left">Professor ID</th>
                        <th className="px-4 py-2 text-left">Hours/Week</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.course_id} className="border-t border-bg-600">
                            <td className="px-4 py-2">{course.course_id}</td>
                            <td className="px-4 py-2">{course.course_name}</td>
                            <td className="px-4 py-2">{course.professor_id}</td>
                            <td className="px-4 py-2">{course.hours_per_week}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Courses;