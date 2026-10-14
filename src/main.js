import { TodoService } from './TodoService.js';
import { TodoRenderer } from './TodoRenderer.js';
import { LocalStorageHandler } from './LocalStorageHandler.js';

const service = new TodoService(new LocalStorageHandler());
const renderer = new TodoRenderer('task-container');

renderer.render(service);

const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const addUrgentBtn = document.getElementById('add-urgent-btn');
const taskContainer = document.getElementById('task-container');

function add(type) {
  const newId = service.addTask(input.value, type);
  if (newId) {
    input.value = '';
    renderer.render(service, newId);
  }
}

addBtn.addEventListener('click', () => add('simple'));
addUrgentBtn.addEventListener('click', () => add('urgent'));
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addBtn.click();
  }
});

taskContainer.addEventListener('click', (event) => {
  const toggleButton = event.target.closest('[data-toggle]');
  if (toggleButton) {
    service.toggleComplete(Number(toggleButton.dataset.toggle));
    renderer.render(service);
    return;
  }

  const deleteButton = event.target.closest('[data-delete]');
  if (deleteButton) {
    service.deleteTask(Number(deleteButton.dataset.delete));
    renderer.render(service);
  }
});
