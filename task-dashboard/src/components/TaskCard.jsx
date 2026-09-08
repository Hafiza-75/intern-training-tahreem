function TaskCard({ task, onToggleStatus, onEditTask }) {
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
        Priority: <strong> {task.priority || "Medium"} </strong>
      </p>


      <div className="task-buttons">
        <button onClick={() => onToggleStatus(task.id)}>
          {task.completed
            ? "Mark as Pending"
            : "Mark as Completed"}
        </button>

        <button onClick={() => onEditTask(task)}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default TaskCard;