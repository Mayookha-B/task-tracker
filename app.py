import sqlite3
from flask import Flask, request, jsonify

class Task:
    def __init__(self, task_id, title, done=False):
        self.task_id = task_id
        self.title = title
        self.done = done

app = Flask(__name__)
def init_db():
    conn = sqlite3.connect("tasks.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            done INTEGER NOT NULL DEFAULT 0
        )
    """)
    conn.close()

init_db()
tasks = []
next_id = 1

@app.route("/")
def home():
    return "Task Tracker is running!"
# to add a task(create a  task)
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    if not data or "title" not in data or not data["title"].strip():
        return jsonify({"error": "Title is required"}), 400
    conn = sqlite3.connect("tasks.db")
    conn.execute("INSERT INTO tasks (title, done) VALUES (?, 0)", (data["title"],))
    conn.commit()
    new_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()
    return jsonify({"id": new_id, "title": data["title"], "done": False})
# to view a task
@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.execute("SELECT id, title, done FROM tasks")
    tasks = [{"id": row[0], "title": row[1], "done": bool(row[2])} for row in cursor.fetchall()]
    conn.close()
    return jsonify(tasks)
# to modify a task
@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    conn = sqlite3.connect("tasks.db")
    conn.execute("UPDATE tasks SET done = 1 WHERE id = ?", (task_id,))
    conn.commit()
    row = conn.execute("SELECT id, title, done FROM tasks WHERE id = ?", (task_id,)).fetchone()
    conn.close()
    if row is None:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"id": row[0], "title": row[1], "done": bool(row[2])})
#to delete a task
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    conn = sqlite3.connect("tasks.db")
    cursor = conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        return jsonify({"error": "Task not found"}), 404
    return jsonify({"message": "Task deleted"})
if __name__ == "__main__":
    app.run(debug=True)