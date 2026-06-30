const input = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks when page opens
displayTasks();

addBtn.addEventListener("click", addTask);

function addTask() {

    const taskText = input.value.trim();

    if (taskText === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text: taskText,

        completed: false

    });

    saveTasks();

    displayTasks();

    input.value = "";

}

// Display all tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {

            li.classList.add("completed");

        }

        li.innerHTML = `

            <span>${task.text}</span>

            <div class="actions">

            <button class="complete" onclick="toggleComplete(${index})">

            ✓

            </button>

            <button class="edit" onclick="editTask(${index})">

            Edit

            </button>

            <button class="delete" onclick="deleteTask(${index})">

            Delete

            </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}

// Save tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Delete
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();

}

// Edit
function editTask(index) {

    const newTask = prompt("Edit Task", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {

        tasks[index].text = newTask.trim();

        saveTasks();

        displayTasks();

    }

}

// Mark Complete
function toggleComplete(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}