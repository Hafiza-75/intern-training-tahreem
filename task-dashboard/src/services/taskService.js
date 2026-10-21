
const API_URL = "http://localhost:3000/tasks";

function getAuthHeaders(includeJson = false) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Please login to manage tasks.");
  }

  return {
    Authorization: `Bearer ${token}`,
    ...(includeJson ? { "Content-Type": "application/json" } : {}),
  };
}

async function handleResponse(response, action) {
  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      data?.message
        ? `${action} failed: ${
            Array.isArray(data.message)
              ? data.message.join(", ")
              : data.message
          }`
        : `${action} failed. Status: ${response.status}`
    );
  }

  if (response.status === 204) {
    return true;
  }

  return response.json();
}

export async function getTasks() {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  return handleResponse(response, "Fetching tasks");
}

export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      completed: taskData.completed ?? false,
    }),
  });

  return handleResponse(response, "Creating task");
}

export async function updateTask(id, taskData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(true),
    body: JSON.stringify({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      completed: taskData.completed,
    }),
  });

  return handleResponse(response, "Updating task");
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(response, "Deleting task");
}
