import { useState } from "react";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import TaskCard from "./components/TaskCard";
import TaskControls from "./components/TaskControls";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React Components",
      description: "Understand reusable React components.",
      completed: false,
    },
    {
      id: 2,
      title: "Practice Props and State",
      description: "Practice passing props and managing state.",
      completed: false,
    },
    {
      id: 3,
      title: "Complete Day 8 Task",
      description: "Build an add and edit task form.",
      completed: true,
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

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

        <TaskForm
          onAddTask={addTask}
          onEditTask={updateTask}
          editingTask={editingTask}
          onCancelEdit={cancelEdit}
        />

        <TaskControls
          onAddTask={() => setEditingTask(null)}
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
                  onEditTask={editTask}
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