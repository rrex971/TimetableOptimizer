import os
from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")


try:
    mongo = PyMongo(app)

except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    mongo = None

jwt = JWTManager(app)


@app.route('/')
def home():
    return "Welcome! Go to /register, /login, or /protected"


@app.route("/register", methods=["POST"])
def register():
    if not mongo:
        return jsonify({"msg": "Database connection error"}), 500

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    if not username or not password or not role:
        return jsonify({"msg": "Missing username, password, or role"}), 400

    if role not in ['admin', 'faculty', 'student']:
        return jsonify({"msg": "Invalid role. Must be 'admin', 'faculty', or 'student'"}), 400

    if mongo.db.users.find_one({"username": username}):
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = generate_password_hash(password)

    mongo.db.users.insert_one({
        "username": username,
        "password_hash": hashed_password,
        "role": role
    })

    return jsonify({"msg": "User created successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    if not mongo:
        return jsonify({"msg": "Database connection error"}), 500

    data = request.get_json()
    username = data.get("username", None)
    password = data.get("password", None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user = mongo.db.users.find_one({"username": username})

    if user and check_password_hash(user["password_hash"], password):
        access_token = create_access_token(
            identity=username,
            additional_claims={"role": user["role"]}
        )
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Bad username or password"}), 401


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_identity = get_jwt_identity()

    return jsonify(logged_in_as=current_user_identity), 200


@jwt.unauthorized_loader
def unauthorized_callback(reason):
    return jsonify({"msg": "Missing Authorization Header"}), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"msg": "Signature verification failed"}), 422


if __name__ == '__main__':
    app.run(debug=True)
