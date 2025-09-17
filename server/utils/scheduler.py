import random
import constraint


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


def create_solver(courses):
    """
    Creates and solves the timetable constraint satisfaction problem.
    """
    problem = constraint.Problem()

    all_course_ids = [course['course_id'] for course in courses]

    if len(all_course_ids) > len(DOMAIN):
        print("Error: Not enough time slots for all courses.")
        return None

    problem.addVariables(all_course_ids, DOMAIN)

    problem.addConstraint(constraint.AllDifferentConstraint(), all_course_ids)

    print("Starting timetable solver...")
    solutions = problem.getSolutions()

    solution = random.choice(solutions)

    if not solution:
        print("No solution found! Constraints may be impossible.")
        return None

    print("Solver finished. Solution found.")
    return solution


def format_solution_for_user(solution, user_course_ids):

    user_timetable = {day: [] for day in DAYS}

    for course_id in user_course_ids:
        if course_id in solution:
            day_idx, time_idx = solution[course_id]

            day_name = DAYS[day_idx]
            time_str = TIME_SLOT_MAP.get(time_idx, "Unknown Time")

            user_timetable[day_name].append({
                "time": time_str,
                "subject": course_id
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
