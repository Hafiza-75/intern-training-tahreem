
const API_URL = "http://localhost:3000/tasks";

function getHeaders() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Please login to manage subtasks.");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(
      data?.message
        ? Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message
        : `Request failed: ${response.status}`
    );
  }

  if (response.status === 204) return true;

  return response.json();
}

export async function getSubtasks(taskId) {
  const response = await fetch(
    `${API_URL}/${taskId}/subtasks`,
    { headers: getHeaders() }
  );

  return handleResponse(response);
}

export async function createSubtask(taskId, title) {
  const response = await fetch(
    `${API_URL}/${taskId}/subtasks`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ title }),
    }
  );

  return handleResponse(response);
}

export async function updateSubtask(taskId, subtaskId, data) {
  const response = await fetch(
    `${API_URL}/${taskId}/subtasks/${subtaskId}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  return handleResponse(response);
}

export async function deleteSubtask(taskId, subtaskId) {
  const response = await fetch(
    `${API_URL}/${taskId}/subtasks/${subtaskId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  return handleResponse(response);
}
