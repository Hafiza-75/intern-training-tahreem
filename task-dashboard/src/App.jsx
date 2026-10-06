import { useEffect, useState } from "react";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import TaskCard from "./components/TaskCard";
import TaskControls from "./components/TaskControls";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import ApiTasks from "./components/ApiTasks";
import Profile from "./components/Profile";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

function App() {
  // TASK STATE
  const [tasks, setTasks] = useState([]);

  // FORM STATE
  const [editingTask, setEditingTask] = useState(null);

  // FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // LOADING + ERROR STATE
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET TASKS
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();

        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // ADD TASK
  const addTask = async (taskData) => {
    try {
      setError("");

      const newTask = await createTask(taskData);

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  // START EDITING
  const editTask = (task) => {
    setEditingTask(task);
  };

  // UPDATE TASK
  const updateTaskHandler = async (updatedTask) => {
    try {
      setError("");

      const savedTask = await updateTask(
        updatedTask.id,
        updatedTask
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === savedTask.id
            ? savedTask
            : task
        )
      );

      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingTask(null);
  };

  // TOGGLE TASK STATUS
  const toggleTaskStatus = async (taskId) => {
    const task = tasks.find(
      (task) => task.id === taskId
    );

    if (!task) return;

    try {
      setError("");

      const updatedTask = await updateTask(taskId, {
        ...task,
        completed: !task.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id
            ? updatedTask
            : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // CLEAR COMPLETED TASKS
  const clearCompletedTasks = async () => {
    const completedTasks = tasks.filter(
      (task) => task.completed
    );

    try {
      setError("");

      await Promise.all(
        completedTasks.map((task) =>
          deleteTask(task.id)
        )
      );

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => !task.completed
        )
      );
    } catch (err) {
      setError(err.message);
    }
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
        (filterStatus === "completed" &&
          task.completed) ||
        (filterStatus === "pending" &&
          !task.completed);

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

        <Profile />

        <TaskForm
          onAddTask={addTask}
          onEditTask={updateTaskHandler}
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

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

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