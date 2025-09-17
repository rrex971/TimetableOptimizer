import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Timetable from "./components/Timetable";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginLanding from "./screens/LoginLanding";
import Student from "./screens/Student";
import Faculty from "./screens/Faculty";
import Admin from "./screens/Admin";

function App() {
  return (
    <Router>
      <div className="main font-main bg-bg-800 min-h-screen w-screen">
        <Routes>
          <Route path="/" element={<LoginLanding />} />
          <Route path="/student" element={
            <ProtectedRoute requiredRole="student">
              <Student />
            </ProtectedRoute>
          } />
          <Route path="/faculty" element={
            <ProtectedRoute requiredRole="faculty">
              <Faculty />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/schedule" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-bg-800">
                <Navbar />
                <div className="px-12 py-8">
                  <h1 className="text-4xl font-bold text-white mb-8">Schedule</h1>
                  <Timetable />
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-bg-800">
                <Navbar />
                <div className="px-12 py-8">
                  <h1 className="text-4xl font-bold text-white mb-8">Courses</h1>
                  <div className="text-white">Courses page content coming soon...</div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-bg-800">
                <Navbar />
                <div className="px-12 py-8">
                  <h1 className="text-4xl font-bold text-white mb-8">Contact</h1>
                  <div className="text-white">Contact page content coming soon...</div>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
