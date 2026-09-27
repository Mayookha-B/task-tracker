const taskList = document.getElementById("taskList");
const titleInput = document.getElementById("titleInput");
const addBtn = document.getElementById("addBtn");

async function loadTasks() {
    const res = await fetch("/tasks");
    const tasks = await res.json();
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.title;
        if (task.done) {
            span.classList.add("done");
        }

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("task-buttons");

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.onclick = () => markDone(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        buttonsDiv.appendChild(doneBtn);
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonsDiv);
        taskList.appendChild(li);
    });
}

async function addTask() {
    const title = titleInput.value.trim();
    if (!title) return;
    await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
    titleInput.value = "";
    loadTasks();
}

async function markDone(id) {
    await fetch(`/tasks/${id}`, { method: "PUT" });
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: "DELETE" });
    loadTasks();
}

addBtn.addEventListener("click", addTask);
loadTasks();