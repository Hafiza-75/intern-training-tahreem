const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function getTasks(limit = 5) {
  const response = await fetch(`${API_URL}?_limit=${limit}`);

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
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task. Status: ${response.status}`);
  }

  return await response.json();
}

export async function updateTask(id, taskData) {
  // Local/Newly created tasks (ID > 200) mock update
  if (id > 200) {
    return { id, ...taskData };
  }

  const response = await fetch(`${API_URL}/${id}`, {
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

export async function deleteTask(id) {
  // Local/Newly created tasks (ID > 200) mock delete
  if (id > 200) {
    return true;
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task. Status: ${response.status}`);
  }

  return true;
}