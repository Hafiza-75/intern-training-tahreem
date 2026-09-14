import { useCallback, useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

function ApiTasks() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks(5);
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function fetchTasksOnMount() {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks(5);
        if (!ignore) {
          setTasks(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load tasks.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchTasksOnMount();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCreateTask = async (event) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setCreating(true);

      const newTask = {
        title: title.trim(),
        completed: false,
        userId: 1,
      };

      const createdTask = await createTask(newTask);

      setTasks((currentTasks) => [createdTask, ...currentTasks]);

      setTitle("");
      setSuccess("Task created successfully.");
    } catch (err) {
      setError(err.message || "Failed to create task.");
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setSuccess("");
    setError("");
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setUpdatingId(editingId);

      const updatedTask = await updateTask(editingId, {
        title: title.trim(),
        completed: false,
        userId: 1,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingId
            ? { ...task, ...updatedTask }
            : task
        )
      );

      setEditingId(null);
      setTitle("");

      setSuccess("Task updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update task.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setError("");
    setSuccess("");
  };

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    setSuccess("");
    setError("");

    try {
      setDeletingId(taskId);

      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );

      setSuccess("Task deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete task.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <section>
        <h2>API Tasks</h2>
        <p className="loading-message">Loading tasks...</p>
      </section>
    );
  }

  return (
    <section>
      <h2>API Task Management</h2>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Inline Form with auto-sized buttons */}
      <form
        className="api-form"
        onSubmit={
          editingId !== null ? handleUpdateTask : handleCreateTask
        }
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <div className="form-buttons">
          {editingId !== null ? (
            <>
              <button type="submit" disabled={updatingId !== null}>
                {updatingId !== null ? "Updating..." : "Update Task"}
              </button>

              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button type="submit" disabled={creating}>
              {creating ? "Creating..." : "Create Task"}
            </button>
          )}
        </div>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-message">No tasks available.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>

              <p>
                Status: {task.completed ? "Completed" : "Pending"}
              </p>

              {/* Added task-actions wrapper to separate Edit/Delete buttons */}
              <div className="task-actions">
                <button type="button" onClick={() => handleEdit(task)}>
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(task.id)}
                  disabled={deletingId === task.id}
                >
                  {deletingId === task.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="reload-btn" onClick={loadTasks}>
        Reload Tasks
      </button>
    </section>
  );
}

export default ApiTasks;