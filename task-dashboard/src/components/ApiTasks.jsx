import { useEffect, useState } from "react";
import { getTasks, createTask } from "../services/taskService";

function ApiTasks() {
  const [tasks, setTasks] = useState([]);

  // API states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // POST state
  const [creating, setCreating] = useState(false);

  // Fetch tasks on initial mount only
  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks(5);

        if (isMounted) {
          setTasks(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this runs strictly ONCE on mount

  const handleCreateTask = async () => {
    try {
      setCreating(true);
      setError("");

      const newTask = {
        title: "Practice API States",
        completed: false,
        userId: 1,
      };

      const createdTask = await createTask(newTask);

      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  // 1. LOADING STATE
  if (loading) {
    return (
      <section>
        <h2>API Tasks</h2>
        <p className="loading-message">Loading tasks...</p>
      </section>
    );
  }

  // 2. ERROR STATE
  if (error) {
    return (
      <section>
        <h2>API Tasks</h2>
        <p className="error-message">{error}</p>
        <button 
          type="button" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </section>
    );
  }

  // 3. SUCCESS / EMPTY STATE
  return (
    <section>
      <h2>API Tasks</h2>

      <button
        type="button"
        onClick={handleCreateTask}
        disabled={creating}
      >
        {creating ? "Creating Task..." : "Create API Task"}
      </button>

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
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ApiTasks;