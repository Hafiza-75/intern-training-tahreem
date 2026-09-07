function TaskCard({ task, onToggleStatus }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>
        Status:{" "}
        <strong>
          {task.completed ? "Completed" : "Pending"}
        </strong>
      </p>

      <button onClick={() => onToggleStatus(task.id)}>
        {task.completed ? "Mark as Pending" : "Mark as Completed"}
      </button>
    </div>
  );
}

export default TaskCard;