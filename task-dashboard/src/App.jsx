
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import TaskCard from "./components/TaskCard";
import TaskControls from "./components/TaskControls";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

function App() {
  // AUTHENTICATION STATE
  const [token, setToken] = useState(
    () => localStorage.getItem("access_token")
  );
  const [authUser, setAuthUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [checkingSession, setCheckingSession] = useState(
    () => Boolean(localStorage.getItem("access_token"))
  );

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // VERIFY EXISTING LOGIN SESSION
  useEffect(() => {
    if (!token) {
      setAuthUser(null);
      setCheckingSession(false);
      return;
    }

    let cancelled = false;

    const verifySession = async () => {
      setCheckingSession(true);

      try {
        const response = await fetch(
          "http://localhost:3000/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Session expired. Please log in again."
          );
        }

        if (!cancelled) {
          setAuthUser(data);
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem("access_token");
          setToken(null);
          setAuthUser(null);
          setAuthPage("login");
        }
      } finally {
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    };

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [token]);

  // HANDLE SUCCESSFUL LOGIN
  const handleLoginSuccess = () => {
    const savedToken = localStorage.getItem("access_token");

    setToken(savedToken);
    setError("");
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("access_token");

    setToken(null);
    setAuthUser(null);
    setTasks([]);
    setEditingTask(null);
    setAuthPage("login");
    setError("");
    setLoading(false);
  };

  // LOAD TASKS AFTER LOGIN
  useEffect(() => {
    if (!token || !authUser) return;

    let cancelled = false;

    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();

        if (!cancelled) {
          setTasks(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, [token, authUser]);

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
          task.id === savedTask.id ? savedTask : task
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
    const task = tasks.find((task) => task.id === taskId);

    if (!task) return;

    try {
      setError("");

      const updatedTask = await updateTask(taskId, {
        ...task,
        completed: !task.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
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
        completedTasks.map((task) => deleteTask(task.id))
      );

      setTasks((currentTasks) =>
        currentTasks.filter((task) => !task.completed)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // CLEAR ALL FILTERS
  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setSortOrder("default");
    setPriorityFilter("all");
  };

  // FILTER + SEARCH + SORT
  const displayedTasks = tasks
    .filter((task) => {
      const title = (task.title || "").toLowerCase();
      const description = (task.description || "").toLowerCase();
      const query = searchTerm.toLowerCase();

      const matchesSearch =
        title.includes(query) ||
        description.includes(query);

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" && task.completed) ||
        (filterStatus === "pending" && !task.completed);

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

  // SHOW LOGIN OR REGISTER
  if (!token) {
    return (
      <main>
        {authPage === "login" ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() =>
              setAuthPage("register")
            }
          />
        ) : (
          <Register
            onSwitchToLogin={() =>
              setAuthPage("login")
            }
          />
        )}
      </main>
    );
  }

  // WAIT FOR SESSION VERIFICATION
  if (checkingSession || !authUser) {
    return <p>Verifying login session...</p>;
  }

  // AUTHENTICATED DASHBOARD
  return (
    <>
      <Header totalTasks={tasks.length} />

      <main>
        <Welcome
          name={authUser.name || "User"}
          hasTasks={tasks.length > 0}
        />

        <Profile
          token={token}
          onLogout={handleLogout}
        />

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
          onClearFilters={clearFilters}
        />

        <section>
          <h2>My Tasks</h2>

          {error && (
            <p className="error-message">{error}</p>
          )}

          {loading ? (
            <p className="loading-message">
              Loading tasks...
            </p>
          ) : displayedTasks.length > 0 ? (
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
            <p className="empty-message">
              No tasks found.
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
