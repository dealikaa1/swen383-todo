export class TodoRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(service, justAddedId) {
    if (!this.container) {
      return;
    }

    const pendingTasks = service.tasks.filter((task) => !task.completed);
    const completedTasks = service.tasks.filter((task) => task.completed);
    const oldestPendingLabel = pendingTasks.length ? pendingTasks[0].desc : 'none';

    this.container.innerHTML =
      `<p class="status">${summarizeWorkload(service)} - oldest: ${oldestPendingLabel}</p>` +
      '<h2 class="section-title">To do</h2>' +
      `<ul>${pendingTasks.map((task) => this.renderTask(task)).join('') || '<li>Nothing pending. Add a task above.</li>'}</ul>` +
      '<h2 class="section-title">Completed</h2>' +
      `<ul>${completedTasks.map((task) => this.renderTask(task)).join('') || '<li>Nothing completed yet.</li>'}</ul>`;

    if (justAddedId) {
      const row = this.container.querySelector(`[data-row="${justAddedId}"]`);
      if (row) {
        row.classList.add('flash');
        setTimeout(() => row.classList.remove('flash'), 1500);
      }
    }

    function summarizeWorkload(service) {
      let done = 0;
      let urgent = 0;
      let normal = 0;

      for (const task of service.tasks) {
        if (task.completed) {
          done++;
        } else if (task.priority === 'high') {
          urgent++;
        } else {
          normal++;
        }
      }

      return `${done}/${service.tasks.length} done - ${urgent} urgent, ${normal} normal remaining`;
    }

    document.title = `Todo (${pendingTasks.length})`;
  }

  renderTask(task) {
    const label = task.desc.length > 40 ? `${task.desc.slice(0, 40)}...` : task.desc;
    const priorityClass = task.priority === 'high' ? 'priority-high' : '';
    const completedClass = task.completed ? 'completed' : '';

    return `<li class="${completedClass}" data-row="${task.id}">
      <span class="task-desc ${priorityClass}">${label}</span>
      <span class="task-time">${task.createdAt}</span>
      <span class="task-actions">
        <button data-toggle="${task.id}">${task.completed ? 'Undo' : 'Done'}</button>
        <button data-delete="${task.id}">Delete</button>
      </span>
    </li>`;
  }
}
