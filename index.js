
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value.trim() === '') {
    alert('Введіть назву справи');
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: taskInput.value,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  taskInput.value = '';
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const tasks = getTasks();

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
      <span>${task.name}</span>
      <button onclick="deleteTask(${task.id})">Видалити</button>
    `;
    taskList.appendChild(li);
  });
}

function deleteTask(id) {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.id !== id);
  saveTasks(updatedTasks);
  renderTasks();
}

function toggleTask(id) {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  saveTasks(updatedTasks);
  renderTasks();
}

function getTasks() {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}