document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
}

const toggleTastComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const completeTask = tasks.filter(task => task.completed).length;
    const totalTask = tasks.length;
    const progress = (completeTask / totalTask) * 100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTask} / ${totalTask}`;
}

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
         <div class="task ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
            <p>${task.text}</p>
         </div>
         <div class="icons">
            <img src="./img/ed.png" alt="edit" onClick="editTask(${index})">
            <img src="./img/delete.png" alt="bin" onClick="deleteTask(${index})">
         </div>
       </div>
        `;

        listItem.addEventListener("change", () => toggleTastComplete(index))
        taskList.appendChild(listItem);
    });
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault()

    addTask()
})