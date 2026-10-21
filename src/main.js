// src/main.js
import { TodoService } from './TodoService.js';
import { TodoRenderer } from './TodoRenderer.js';
import { LocalStorageHandler } from './LocalStorageHandler.js';
import { TodoController } from './TodoController.js';

const service = new TodoService(new LocalStorageHandler());
const renderer = new TodoRenderer('task-container');
const controller = new TodoController(service, renderer);

controller.start();

const input        = document.getElementById('task-input');
const addBtn       = document.getElementById('add-task-btn');
const addUrgentBtn = document.getElementById('add-urgent-btn');
const taskContainer = document.getElementById('task-container');

function add(type) {
  if (controller.addTask(input.value, type)) {
    input.value = '';
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
  if (!(event.target instanceof Element)) {
    return;
  }

  const toggleButton = event.target.closest('[data-toggle]');
  if (toggleButton) {
    controller.toggleTask(Number(toggleButton.dataset.toggle));
    return;
  }

  const deleteButton = event.target.closest('[data-delete]');
  if (deleteButton) {
    controller.deleteTask(Number(deleteButton.dataset.delete));
  }
});