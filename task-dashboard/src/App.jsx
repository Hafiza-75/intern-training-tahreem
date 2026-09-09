import { useEffect, useState } from "react";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import TaskCard from "./components/TaskCard";
import TaskControls from "./components/TaskControls";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import ApiTasks from "./components/ApiTasks";

function App() {
  // TASK STATE
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React Components",
      description: "Understand reusable React components.",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Practice Props and State",
      description: "Practice passing props and managing state.",
      priority: "Medium",
      completed: false,
    },
    {
      id: 3,
      title: "Complete Day 9 Task",
      description: "Implement lists, search, filters, and sorting.",
      priority: "High",
      completed: true,
    },
    {
      id: 4,
      title: "Build Task Dashboard",
      description: "Create a responsive task management application.",
      priority: "Low",
      completed: false,
    },
  ]);

  // FORM STATE
  const [editingTask, setEditingTask] = useState(null);

  // FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // LOADING STATE
  const [loading, setLoading] = useState(true);

  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // ADD TASK
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  // START EDITING
  const editTask = (task) => {
    setEditingTask(task);
  };

  // UPDATE TASK
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    setEditingTask(null);
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingTask(null);
  };

  // TOGGLE TASK STATUS
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

  // CLEAR COMPLETED TASKS
  const clearCompletedTasks = () => {
    const remainingTasks = tasks.filter(
      (task) => !task.completed
    );

    setTasks(remainingTasks);
  };

  // FILTER + SEARCH + SORT
  const displayedTasks = tasks
    .filter((task) => {
      // Search
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" && task.completed) ||
        (filterStatus === "pending" && !task.completed);

      // Priority filter
      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    })
    .sort((a, b) => {
      if (sortOrder === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sortOrder === "za") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

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
          onClearCompleted={clearCompletedTasks}
        />

        <TaskFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
        />

        <section>
          <h2>My Tasks</h2>

          {/* Loading State */}
          {loading ? (
            <p className="loading-message">
              Loading tasks...
            </p>
          ) : displayedTasks.length > 0 ? (
            /* Dynamic List */
            <div className="task-list">
              {displayedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleStatus={toggleTaskStatus}
                  onEditTask={editTask}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <p className="empty-message">
              No tasks found.
            </p>
          )}
        </section>
        
        
        <ApiTasks />

      </main>
    </>
  );
}

export default App;