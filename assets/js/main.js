// PROJETO DE LISTA DE TAREFAS //

const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const ulTasks = document.querySelector('.tasks');

function createLi() {
  const li = document.createElement('li');
  return li;
}

function deleteTaskButton(li) {
  li.innerHTML += ' ';
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  // deleteButton.classList.add('apagar');
  deleteButton.setAttribute('class', 'deleteLi');
  deleteButton.setAttribute('title', 'Para deletar uma tarefa.');
  li.appendChild(deleteButton);
}

function createTask(receivedText) {
  const li = createLi();
  li.innerHTML = receivedText;
  ulTasks.appendChild(li);
  clearInput();
  deleteTaskButton(li);
  saveTasks();
}

function saveTasks() {
  const liTasks = ulTasks.querySelectorAll('li');
  const taskList = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace('Delete', '').trim();
    taskList.push(taskText);
  }

  const tasksJSON = JSON.stringify(taskList);
  localStorage.setItem('tasks', tasksJSON);
}

function restoreSavedTasks() {
  const tasks = localStorage.getItem('tasks');
  const taskList = JSON.parse(tasks);

  for (let task of taskList) { 
    createTask(task);
  }
}

restoreSavedTasks();

function clearInput() {
  inputTask.value = '';
  inputTask.focus();
}

btnTask.addEventListener('click', () => {
  if (!inputTask.value) return;
  createTask(inputTask.value);
});

inputTask.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    if (!inputTask.value) return; {
    createTask(inputTask.value);
    }
  }
});

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('deleteLi')) {
    el.parentElement.remove();
    saveTasks();
  }
})