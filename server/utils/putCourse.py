import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import certifi

courses = [
    {"course_id": "BCSE103E", "course_name": "Computer Programming: Java"},
    {"course_id": "BCSE202L", "course_name": "Data Structures and Algorithms"},
    {"course_id": "BCSE202P", "course_name": "Data Structures and Algorithms Lab"},
    {"course_id": "BCSE205L", "course_name": "Computer Architecture and Organization"},
    {"course_id": "BCSE308L", "course_name": "Computer Networks"},
    {"course_id": "BCSE308P", "course_name": "Computer Networks Lab"},
    {"course_id": "BECE204L", "course_name": "Microprocessors and Microcontrollers"},
    {"course_id": "BECE204P",
        "course_name": "Microprocessors and Microcontrollers Lab"},
    {"course_id": "BFRE101L", "course_name": "French I"},
    {"course_id": "BMAT201L", "course_name": "Complex Variables and Linear Algebra"},
    {"course_id": "BSTS202P", "course_name": "Qualitative Skills Practice II"},

    {"course_id": "BCSE203E", "course_name": "Web Programming"},
    {"course_id": "BCSE203E", "course_name": "Web Programming"},
    {"course_id": "BCSE302L", "course_name": "Database Systems"},
    {"course_id": "BCSE302P", "course_name": "Database Systems Lab"},
    {"course_id": "BCSE303L", "course_name": "Operating Systems"},
    {"course_id": "BCSE303P", "course_name": "Operating Systems Lab"},
    {"course_id": "BCSE304L", "course_name": "Theory of Computation"},
    {"course_id": "BCSE313L", "course_name": "Fundamentals of Fog and Edge Computing"},
    {"course_id": "BMAT202L", "course_name": "Probability and Statistics"},
    {"course_id": "BMAT202P", "course_name": "Probability and Statistics Lab"},
    {"course_id": "BSTS102P", "course_name": "Quantitative Skills Practice II"},
]


def format_courses_object(course_list):
    structured_courses = []
    processed_ids = set()

    for course in course_list:
        course_id = course["course_id"]

        if course_id in processed_ids:
            continue

        if course_id.endswith('P'):
            hours = 2
        elif course_id.startswith('BSTS'):
            hours = 2
        else:
            hours = 3

        new_course_doc = {
            "course_id": course_id,
            "course_name": course["course_name"],
            "professor_id": None,
            "hours_per_week": hours
        }

        structured_courses.append(new_course_doc)
        processed_ids.add(course_id)

    return structured_courses


def push_courses_to_mongo():

    load_dotenv()
    mongo_uri = os.getenv("MONGO_URI")

    if not mongo_uri:
        print("Error: MONGO_URI not found in .env file.")
        return

    print("Connecting to MongoDB...")
    client = None
    try:
        ca = certifi.where()
        client = MongoClient(mongo_uri, tlsCAFile=ca)

        client.admin.command('ismaster')
        print("MongoDB connection successful!")
    except ConnectionFailure as e:
        print(f"Could not connect to MongoDB: {e}")
        return
    except Exception as e:
        print(f"An unknown error occurred during connection: {e}")
        return

    try:
        db = client['DB']
        collection = db['courses']

        print(f"Deleting all documents from '{collection.name}'...")
        delete_result = collection.delete_many({})
        print(f"Deleted {delete_result.deleted_count} documents.")

        formatted_courses = format_courses_object(courses)

        if formatted_courses:
            print(
                f"Inserting {len(formatted_courses)} documents into '{collection.name}' collection...")
            result = collection.insert_many(formatted_courses)
            print(
                f"Successfully inserted {len(result.inserted_ids)} documents.")
        else:
            print("No courses to insert.")

    except Exception as e:
        print(f"An error occurred during the database operation: {e}")
    finally:

        if client:
            client.close()
            print("MongoDB connection closed.")


push_courses_to_mongo()
