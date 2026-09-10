import { useEffect, useState } from "react";
import { getTasks, createTask } from "../services/taskService";

function ApiTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // GET REQUEST
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);

        const data = await getTasks(5);

        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  // POST REQUEST
  const handleCreateTask = async () => {
    try {
      setCreating(true);
      setError("");

      const newTaskData = {
        title: "Practice API Integration",
        completed: false,
        userId: 1,
      };

      const createdTask = await createTask(newTaskData);

      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <p>Loading tasks from API...</p>;
  }

  return (
    <section>
      <h2>API Integrated Tasks</h2>

      {error && (
        <p className="error-message">
          Error: {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleCreateTask}
        disabled={creating}
      >
        {creating ? "Creating Task..." : "Create API Task"}
      </button>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>

            <p>
              Status:{" "}
              {task.completed
                ? "Completed"
                : "Pending"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ApiTasks;