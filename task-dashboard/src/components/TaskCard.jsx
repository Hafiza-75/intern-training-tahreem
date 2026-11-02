
import { useEffect, useState } from "react";
import {
  getSubtasks,
  createSubtask,
  updateSubtask,
  deleteSubtask,
} from "../services/subtaskService.js";

function TaskCard({ task, onToggleStatus, onEditTask }) {
  const [subtasks, setSubtasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadSubtasks() {
      setLoading(true);
      setError("");

      try {
        const data = await getSubtasks(task.id);
        if (active) setSubtasks(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadSubtasks();

    return () => {
      active = false;
    };
  }, [task.id]);

  async function handleAddSubtask(event) {
    event.preventDefault();

    const title = newTitle.trim();
    if (!title) return;

    setSaving(true);
    setError("");

    try {
      const created = await createSubtask(task.id, title);
      setSubtasks((current) => [...current, created]);
      setNewTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleSubtask(subtask) {
    setError("");

    try {
      const updated = await updateSubtask(
        task.id,
        subtask.id,
        { completed: !subtask.completed }
      );

      setSubtasks((current) =>
        current.map((item) =>
          item.id === updated.id ? updated : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteSubtask(subtaskId) {
    setError("");

    try {
      await deleteSubtask(task.id, subtaskId);

      setSubtasks((current) =>
        current.filter((item) => item.id !== subtaskId)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  const completedCount = subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const progress =
    subtasks.length > 0
      ? Math.round((completedCount / subtasks.length) * 100)
      : 0;

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        Status:{" "}
        <strong>
          {task.completed ? "Completed" : "Pending"}
        </strong>
      </p>

      <p>
        Priority: <strong>{task.priority || "Medium"}</strong>
      </p>

      <div className="task-buttons">
        <button onClick={() => onToggleStatus(task.id)}>
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>

        <button onClick={() => onEditTask(task)}>
          Edit
        </button>
      </div>

      <hr />

      <section className="subtasks-section">
        <h4>Subtasks & Checklist</h4>

        {loading ? (
          <p>Loading subtasks...</p>
        ) : (
          <>
            <p>
              Progress: {completedCount}/{subtasks.length} completed
              {" "}({progress}%)
            </p>

            <progress
              value={progress}
              max="100"
              style={{ width: "100%" }}
            />

            {subtasks.length === 0 ? (
              <p>No subtasks yet. Add your first step!</p>
            ) : (
              <ul className="subtask-list">
                {subtasks.map((subtask) => (
                  <li key={subtask.id} className="subtask-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtask(subtask)}
                      />

                      <span
                        style={{
                          textDecoration: subtask.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {subtask.title}
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleDeleteSubtask(subtask.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <form onSubmit={handleAddSubtask} className="subtask-form">
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="Enter a subtask..."
            maxLength={200}
            required
          />

          <button type="submit" disabled={saving || !newTitle.trim()}>
            {saving ? "Adding..." : "Add Subtask"}
          </button>
        </form>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </section>
    </div>
  );
}

export default TaskCard;
