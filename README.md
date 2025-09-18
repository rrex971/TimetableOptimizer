# 🎓 TTHelper

An intelligent timetable generation and management system. This application uses advanced constraint satisfaction algorithms to automatically generate optimal schedules while providing role-based access for students, faculty, and administrators.

## Tech Stack

### Frontend
- **React** 
- **React Router DOM** 
- **Tailwind CSS** 
- **React Icons** 
- **Vite 7.1.2**

### Backend
- **Flask**
- **Flask-JWT-Extended** 
- **Flask-CORS** 
- **PyMongo** 
- **Python-Constraint** 

### Database
- **MongoDB Atlas**

## Installation

### Prerequisites
- **Node.js** 
- **Python**
- **MongoDB Atlas** account

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rrex971/TimetableOptimizer.git
   cd TimetableOptimizer/server
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment setup**
   ```bash
   # Create .env file in server directory
   touch .env
   ```
   
   Add the following variables to `.env`:
   ```env
   JWT_SECRET_KEY=secure_jwt_secret_key
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

5. **Start the Flask server**
   ```bash
   python app.py
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd ../client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Application will run on `http://localhost:5174`

## API Endpoints

### Authentication
- `POST /login` - User authentication
- `POST /register` - User registration (Admin only)

### Course Management
- `GET /courses` - Retrieve all courses
- `GET /faculty/my-course` - Get faculty's assigned course

### Timetable Operations
- `POST /admin/generate-timetable` - Generate new timetable (Admin only)
- `GET /api/my-timetable` - Get user's personal timetable

### Utility
- `GET /protected` - Test protected route access

## Algorithm Approach

### Constraint Satisfaction Problem (CSP)

The timetable generation uses a sophisticated CSP approach:

1. **Variables**: Each course that needs to be scheduled
2. **Domain**: Time slots across 7 days × 12 hours (84 total slots)
3. **Constraints**: 
   - No two courses can occupy the same time slot
   - All courses must be assigned a unique time slot
   - Faculty availability constraints

## Future Enhancements

- **Room Allocation**: Integrate classroom scheduling
- **Faculty Preferences**: Allow preference-based scheduling
- **Conflict Resolution**: Advanced handling of scheduling conflicts
- **Mobile App**: React Native mobile application
- **Analytics Dashboard**: Usage and performance metrics
- **Email Notifications**: Automated schedule notifications
