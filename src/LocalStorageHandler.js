export class LocalStorageHandler {
  loadTasks() {
    const raw = localStorage.getItem('todo-tasks');
    return raw ? JSON.parse(raw) : [];
  }

  saveTasks(tasks) {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }
}
