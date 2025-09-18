import constraint
import json
import os
import random

DAYS = ["Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"]
TIME_SLOT_INDICES = list(range(12))
DOMAIN = [(day_idx, time_idx)
          for day_idx in range(len(DAYS))
          for time_idx in TIME_SLOT_INDICES]

TIME_SLOT_MAP = {
    0: "8:00 AM", 1: "9:00 AM", 2: "10:00 AM", 3: "11:00 AM",
    4: "12:00 PM", 5: "1:00 PM", 6: "2:00 PM", 7: "3:00 PM",
    8: "4:00 PM", 9: "5:00 PM", 10: "6:00 PM", 11: "7:00 PM"
}

CACHE_FILE = os.path.join(os.path.dirname(__file__), 'solutions_cache.json')
MAX_SOLUTIONS_TO_FIND = 10000


def generate_and_cache_solutions(courses):
    problem = constraint.Problem()
    all_course_ids = [course['course_id'] for course in courses]

    if len(all_course_ids) > len(DOMAIN):
        print("Error: Not enough time slots for all courses.")
        return None

    shuffled_domain = DOMAIN[:]
    random.shuffle(shuffled_domain)
    problem.addVariables(all_course_ids, shuffled_domain)
    problem.addConstraint(constraint.AllDifferentConstraint(), all_course_ids)

    print(
        f"Starting solver... looking for up to {MAX_SOLUTIONS_TO_FIND} solutions.")

    solutions_iter = problem.getSolutionIter()
    solutions = []

    try:
        for _ in range(MAX_SOLUTIONS_TO_FIND):
            solutions.append(next(solutions_iter))
    except StopIteration:
        print("Found all possible solutions.")

    if not solutions:
        print("No solutions found!")
        return None

    print(f"Found {len(solutions)} solutions. Caching to file...")
    try:
        with open(CACHE_FILE, 'w') as f:
            json.dump(solutions, f)
        print(f"Solutions cached to {CACHE_FILE}")
        return solutions
    except Exception as e:
        print(f"Error caching solutions to file: {e}")
        return None


def get_solution_from_cache(courses, force_regenerate=False):

    solutions = None

    if not force_regenerate and os.path.exists(CACHE_FILE):
        print(f"Loading solutions from cache file: {CACHE_FILE}")
        try:
            with open(CACHE_FILE, 'r') as f:
                solutions = json.load(f)
            if not solutions:
                print("Cache file is empty. Forcing regeneration.")
                solutions = None
            else:
                print(f"Loaded {len(solutions)} solutions from cache.")
        except Exception as e:
            print(f"Error reading cache file: {e}. Forcing regeneration.")
            solutions = None

    if not solutions:
        print("No cached solutions found or regeneration forced. Running solver...")
        solutions = generate_and_cache_solutions(courses)

    if not solutions:
        return None

    print(f"Selecting 1 random solution from {len(solutions)} options.")
    solution = random.choice(solutions)

    return solution


def format_solution_for_user(solution, user_course_ids, all_courses):

    course_map = {
        course['course_id']: course.get('course_name', '')
        for course in all_courses
    }

    user_timetable = {day: [] for day in DAYS}

    for course_id in user_course_ids:
        if course_id in solution:

            slot_data = solution[course_id]
            if isinstance(slot_data, (list, tuple)) and len(slot_data) == 2:
                day_idx, time_idx = slot_data

                day_name = DAYS[day_idx]
                time_str = TIME_SLOT_MAP.get(time_idx, "Unknown Time")

                course_name = course_map.get(course_id, "Unknown Course")
                if course_name:
                    subject_display = f"{course_id} - {course_name}"
                else:
                    subject_display = course_id

                user_timetable[day_name].append({
                    "time": time_str,
                    "subject": subject_display
                })

    for day_name in user_timetable:
        def get_sortable_time(class_item):
            time_str = class_item['time']
            if "Unknown" in time_str:
                return -1
            parts = time_str.split(" ")
            hour = int(parts[0].split(":")[0])
            is_pm = parts[1] == "PM"
            if is_pm and hour != 12:
                hour += 12
            if not is_pm and hour == 12:
                hour = 0
            return hour

        user_timetable[day_name].sort(key=get_sortable_time)

    return user_timetable
