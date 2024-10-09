let tasks = [];
let completedCount = 0;

function updateTaskStatus() {
    const totalTasks = tasks.length;
    const pendingTasks = totalTasks - completedCount;
    
    document.getElementById('total-tasks').innerText = totalTasks;
    document.getElementById('pending-tasks').innerText = pendingTasks;
    document.getElementById('completed-tasks').innerText = completedCount;
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';  // Clear input
    }
}

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';  // Clear list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'done' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="done-btn" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });

    updateTaskStatus();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    completedCount = tasks.filter(task => task.completed).length;
    renderTasks();
}

function deleteTask(index) {
    if (tasks[index].completed) {
        completedCount--;
    }
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const newTaskText = prompt('Edit your task:', tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        tasks[index].text = newTaskText.trim();
        renderTasks();
    }
}

