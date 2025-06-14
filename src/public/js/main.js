document.addEventListener("DOMContentLoaded", () => {
  const categoryInput = document.getElementById("category");
  const priorityInput = document.getElementById("priority");
  const tableBody = document.getElementById("tasksBody");
  const filterForm = document.getElementById("filterForm");

  // Helper to create a row
  function createRow(task) {
    return `
      <tr>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.category}</td>
        <td>${task.priority}</td>
        <td>${task.dueDate ? new Date(task.dueDate).toLocaleString() : "-"}</td>
      </tr>
    `;
  }

  // Fetch tasks and update the table
  function fetchTasks() {
    const category = categoryInput.value;
    const priority = priorityInput.value;
    let url = "/api/tasks?";
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (priority) url += `priority=${encodeURIComponent(priority)}&`;

    fetch(url)
      .then((res) => res.json())
      .then((tasks) => {
        tableBody.innerHTML = "";
        if (Array.isArray(tasks) && tasks.length > 0) {
          tableBody.innerHTML = tasks.map(createRow).join("");
        } else {
          tableBody.innerHTML = `<tr><td colspan="5">No tasks found.</td></tr>`;
        }
      })
      .catch((err) => {
        tableBody.innerHTML = `<tr><td colspan="5">Error loading tasks.</td></tr>`;
        console.error(err);
      });
  }

  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchTasks();
  });
});
