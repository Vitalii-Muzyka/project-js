document.addEventListener('DOMContentLoaded', () => {
  loadTasks('Monday');
  loadTasks('Tuesday');
  loadTasks('Wednesday');
  loadTasks('Thursday');
  loadTasks('Friday');
  loadTasks('Saturday');
  loadTasks('Sunday');
});

function addTask(day) {
  const taskInput = document.getElementById(`taskInput${day}`);
  const taskList = document.getElementById(`taskList${day}`);

  if (taskInput.value.trim() === '') {
    alert('Enter a task name');
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: taskInput.value,
    completed: false
  };

  const tasks = getTasks(day);
  tasks.push(task);
  saveTasks(day, tasks);

  taskInput.value = '';
  renderTasks(day);
}

function renderTasks(day) {
  const taskList = document.getElementById(`taskList${day}`);
  taskList.innerHTML = '';

  const tasks = getTasks(day);

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="custom-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${day}', ${task.id})">
      <span ${task.completed ? 'style="text-decoration: line-through; color: var(--text-color-light);"' : ''}>${task.name}</span>
      <button class="button-delete" onclick="deleteTask('${day}', ${task.id})"><img src="images/delete.png" alt="delete" class="button-img"></button>
    `;
    taskList.appendChild(li);
  });
}

function deleteTask(day, id) {
  const tasks = getTasks(day);
  const updatedTasks = tasks.filter(task => task.id !== id);
  const confirmation = confirm('Do you really want to delete the task?');
  if (confirmation) {
    saveTasks(day, updatedTasks);
    renderTasks(day);
  }

}

function toggleTask(day, id) {
  const tasks = getTasks(day);
  const updatedTasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  saveTasks(day, updatedTasks);
  renderTasks(day);
}

function getTasks(day) {
  const storedTasks = localStorage.getItem(`tasks-${day}`);
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks(day, tasks) {
  localStorage.setItem(`tasks-${day}`, JSON.stringify(tasks));
}

function loadTasks(day) {
  renderTasks(day);
}