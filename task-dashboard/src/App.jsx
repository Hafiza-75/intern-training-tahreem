import { useState } from "react";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import TaskCard from "./components/TaskCard";
import TaskControls from "./components/TaskControls";

function App() {
  // STATE
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React Components",
      completed: false,
    },
    {
      id: 2,
      title: "Practice Props and State",
      completed: false,
    },
    {
      id: 3,
      title: "Complete Day 7 Task",
      completed: true,
    },
  ]);

  // EVENT HANDLER — ADD TASK
  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: `New Task ${tasks.length + 1}`,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  // EVENT HANDLER — TOGGLE STATUS
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  // EVENT HANDLER — CLEAR COMPLETED TASKS
  const clearCompletedTasks = () => {
    const remainingTasks = tasks.filter(
      (task) => !task.completed
    );

    setTasks(remainingTasks);
  };

  return (
    <>
      <Header totalTasks={tasks.length} />

      <main>
        <Welcome
          name="Tahreem"
          hasTasks={tasks.length > 0}
        />

        <TaskControls
          onAddTask={addTask}
          onClearCompleted={clearCompletedTasks}
        />

        <section>
          <h2>My Tasks</h2>

          {tasks.length > 0 ? (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleStatus={toggleTaskStatus}
                />
              ))}
            </div>
          ) : (
            <p className="empty-message">
              No tasks available. Add a new task!
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default App;