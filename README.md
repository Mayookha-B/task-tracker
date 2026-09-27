# Task Tracker

A simple REST API for managing tasks, built with Flask and SQLite, with a lightweight HTML/CSS/JavaScript frontend. Containerized with Docker for consistent, portable deployment.

## Features

- Create, view, update (mark done), and delete tasks
- Persistent storage using SQLite
- Input validation and structured error handling (400/404 responses)
- Simple frontend to add, complete, and delete tasks from the browser
- Dockerized for easy setup and consistent runtime across machines

## Tech Stack

- **Backend:** Python, Flask
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript
- **Containerization:** Docker

## Running Locally (without Docker)

```bash
pip install -r requirements.txt
python app.py
```

Visit `http://localhost:5000` in your browser.

## Running with Docker

Build the image:

```bash
docker build -t task-tracker .
```

Run the container:

```bash
docker run -p 5000:5000 task-tracker
```

Visit `http://localhost:5000` in your browser.

## API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | `/tasks`          | Get all tasks            |
| POST   | `/tasks`          | Create a new task        |
| PUT    | `/tasks/<id>`     | Mark a task as done      |
| DELETE | `/tasks/<id>`     | Delete a task            |

## Project Structure

```
task-tracker/
├── app.py
├── requirements.txt
├── Dockerfile
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```