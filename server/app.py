import os
from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager, create_access_token, get_jwt, jwt_required, get_jwt_identity
)
from pymongo import MongoClient  # Using MongoClient directly
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_cors import CORS
from bson import json_util
import json
import certifi

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
if not app.config["JWT_SECRET_KEY"]:
    print("Error: JWT_SECRET_KEY is not set. Check your .env file.")

try:
    ca = certifi.where()
    client = MongoClient(
        os.environ.get("MONGO_URI"),
        serverSelectionTimeoutMS=5000,
        tlsCAFile=ca
    )
    client.server_info()
    db = client.DB
    print("MongoDB connection successful.")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    client = None
    db = None

jwt = JWTManager(app)


@app.route("/register", methods=["POST"])
@jwt_required()
def register():
    claims = get_jwt()
    if claims.get("role") != 'admin':
        return jsonify({"msg": "Administration rights required"}), 403

    if db == None:
        return jsonify({"msg": "Database connection error"}), 500

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    if not username or not password or not role:
        return jsonify({"msg": "Missing username, password, or role"}), 400

    if db.users.find_one({"username": username}):
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    user_document = {
        "username": username,
        "password_hash": hashed_password,
        "role": role
    }

    if role == 'faculty':
        course_id = data.get("course_id")
        if not course_id:
            return jsonify({"msg": "Missing course_id for faculty registration"}), 400

        course = db.courses.find_one({"course_id": course_id})
        if not course:
            return jsonify({"msg": f"Course with ID '{course_id}' not found"}), 404
        if course.get("professor_id") is not None:
            return jsonify({"msg": f"Course '{course_id}' is already assigned"}), 409

        db.courses.update_one(
            {"course_id": course_id},
            {"$set": {"professor_id": username}}
        )

    elif role == 'student':
        student_id = data.get("student_id")
        if not student_id:
            return jsonify({"msg": "Missing student_id for student registration"}), 400
        user_document["student_id"] = student_id

    elif role != 'admin':
        return jsonify({"msg": "Invalid role. Must be 'admin', 'faculty', or 'student'"}), 400

    db.users.insert_one(user_document)

    return jsonify({"msg": f"User '{username}' created successfully as a {role}"}), 201


@app.route("/login", methods=["POST"])
def login():
    if db == None:
        return jsonify({"msg": "Database connection error"}), 500

    data = request.get_json()
    username = data.get("username", None)
    password = data.get("password", None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user = db.users.find_one({"username": username})

    if user and check_password_hash(user["password_hash"], password):
        additional_claims = {"role": user["role"]}
        if user["role"] == 'student' and "student_id" in user:
            additional_claims["student_id"] = user["student_id"]

        access_token = create_access_token(
            identity=username,
            additional_claims=additional_claims
        )
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Bad username or password"}), 401


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_identity = get_jwt_identity()
    claims = get_jwt()
    return jsonify(logged_in_as=current_user_identity, claims=claims), 200


@app.route("/courses", methods=["GET"])
@jwt_required()
def get_courses():
    if db == None:
        return jsonify({"msg": "Database connection error"}), 500

    courses_cursor = db.courses.find({})
    courses_list = json.loads(json_util.dumps(courses_cursor))
    return jsonify(courses_list), 200


@app.route("/faculty/my-course", methods=["GET"])
@jwt_required()
def get_my_course():
    if db == None:
        return jsonify({"msg": "Database connection error"}), 500

    claims = get_jwt()
    if claims.get("role") != 'faculty':
        return jsonify({"msg": "Only users with 'faculty' role can access this"}), 403

    faculty_username = get_jwt_identity()
    assigned_course = db.courses.find_one(
        {"professor_id": faculty_username})

    if not assigned_course:
        return jsonify({"msg": "No course assigned to you"}), 404

    course_details = json.loads(json_util.dumps(assigned_course))
    return jsonify(course_details), 200


@jwt.unauthorized_loader
def unauthorized_callback(reason):
    return jsonify({"msg": "Missing Authorization Header"}), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"msg": "Signature verification failed"}), 422


if __name__ == '__main__':
    app.run(debug=True)
