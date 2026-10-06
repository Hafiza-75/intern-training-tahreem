const API_URL = "http://localhost:3000/tasks";

export async function getTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
  }

  return await response.json();
}

export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      userId: 1,
      completed: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task. Status: ${response.status}`);
  }

  return await response.json();
}

export async function updateTask(id, taskData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      completed: taskData.completed,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task. Status: ${response.status}`);
  }

  return await response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task. Status: ${response.status}`);
  }

  return true;
}