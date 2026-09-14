const API_URL = "https://jsonplaceholder.typicode.com/todos";

// GET
export async function getTasks(limit = 5) {
  const response = await fetch(`${API_URL}?_limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
  }

  return await response.json();
}

// POST
export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task. Status: ${response.status}`);
  }

  return await response.json();
}

// PUT
export async function updateTask(taskId, taskData) {
  // If task is newly created locally (ID > 200), mock the response to prevent 500 server error
  if (taskId > 200) {
    return { id: taskId, ...taskData };
  }

  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task. Status: ${response.status}`);
  }

  return await response.json();
}

// DELETE
export async function deleteTask(taskId) {
  // If task is newly created locally (ID > 200), mock the deletion to prevent 500 server error
  if (taskId > 200) {
    return true;
  }

  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task. Status: ${response.status}`);
  }

  return true;
}