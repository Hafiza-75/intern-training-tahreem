import { useState } from "react";

function TaskForm({ onAddTask, onEditTask, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState(
    editingTask ? editingTask.title : ""
  );

  const [description, setDescription] = useState(
    editingTask ? editingTask.description : ""
  );

  const [priority, setPriority] = useState(
    editingTask ? editingTask.priority || "Medium" : "Medium"
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Task title is required.";
    } else if (title.trim().length < 3) {
      newErrors.title = "Task title must be at least 3 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
    };

    if (editingTask) {
      onEditTask({
        ...editingTask,
        ...taskData,
      });
    } else {
      onAddTask(taskData);
    }

    handleReset();
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setErrors({});
  };

  const handleCancel = () => {
    handleReset();
    onCancelEdit();
  };

  return (
    <section className="task-form-section">
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>

          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
          />

          {errors.title && (
            <p className="error-message">{errors.title}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Description</label>

          <textarea
            id="task-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Enter task description"
            rows="4"
          />

          {errors.description && (
            <p className="error-message">
              {errors.description}
            </p>
          )}
        </div>

        {/* Priority Selector */}
        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>

          <select
            id="task-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit">
            {editingTask ? "Update Task" : "Add Task"}
          </button>

          <button
            type="button"
            onClick={editingTask ? handleCancel : handleReset}
          >
            {editingTask ? "Cancel" : "Reset"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;