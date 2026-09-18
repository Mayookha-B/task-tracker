function loadTasks() {
    fetch("/tasks")
        .then(response => response.json())
        .then(tasks => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.title + " ";
                if (task.done) {
                    li.classList.add("done-task");
                }   

                const doneBtn = document.createElement("button");
                doneBtn.textContent = "Mark Done";
                doneBtn.addEventListener("click", function() {
                    fetch("/tasks/" + task.id, { method: "PUT" })
                        .then(() => loadTasks());
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", function() {
                    fetch("/tasks/" + task.id, { method: "DELETE" })
                        .then(() => loadTasks());
                });

                li.appendChild(doneBtn);
                li.appendChild(deleteBtn);
                list.appendChild(li);
            });
        });
}

loadTasks();

document.getElementById("addBtn").addEventListener("click", function() {
    const input = document.getElementById("titleInput");
    const title = input.value.trim();
    if (!title) return;

    fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title })
    })
    .then(response => response.json())
    .then(() => {
        input.value = "";
        loadTasks();
    });
});