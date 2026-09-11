const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function getTasks(limit = 5) {
  const response = await fetch(`${API_URL}?_limit=${limit}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tasks. Status: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
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
    throw new Error(
      `Failed to create task. Status: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
}