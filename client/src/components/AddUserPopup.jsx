import { useState } from "react";

const AddUserPopup = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "student"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
        // Reset form after submission
        setFormData({
            username: "",
            password: "",
            role: "student"
        });
    };

    const handleCancel = () => {
        // Reset form when canceling
        setFormData({
            username: "",
            password: "",
            role: "student"
        });
        if (onClose) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-bg-900 rounded-2xl border-1 border-bg-800 p-8 w-96">
                <h2 className="text-2xl text-bg-400 font-bold mb-4">Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-bg-300 mb-2" htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-1 border-bg-800 rounded-lg text-bg-300 bg-bg-800" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-bg-300 mb-2" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-1 border-bg-800 text-bg-300 bg-bg-800 rounded-lg" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-bg-300 mb-2" htmlFor="role">Role</label>
                        <select 
                            id="role" 
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border-1 border-bg-800 rounded-lg text-bg-300 bg-bg-800"
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-bg-700 text-bg-300 rounded-lg hover:bg-bg-600 transition-colors"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-bg-600 text-white rounded-lg hover:bg-bg-500 transition-colors"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserPopup;