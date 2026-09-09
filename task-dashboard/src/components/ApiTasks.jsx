import { useState, useEffect } from "react";

function ApiTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

      useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);


    if (loading) {
        return <p> Loading tasks from API ...</p>;
    }

    if (error) {
        return <p> Error: {error} </p>;
    }
 
    return (
        <section>
            <h2>
                Tasks from Api
            </h2>
            {tasks.map((task) => (
                <div key = {task.id} className="task-card">
                    <h3> {task.title} </h3>
                    <p>
                        Status: {task.completed ? "Completed" : "Pending" }
                    </p>
                </div>
            )
            )
            }
        </section>
    );

}

export default ApiTasks;