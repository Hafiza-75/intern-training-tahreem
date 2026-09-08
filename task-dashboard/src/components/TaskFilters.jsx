function TaskFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortOrder,
  onSortChange,
  priorityFilter,
  onPriorityChange,
}) {
  return (
    <section className="task-filters">
      <h2>Search & Filter Tasks</h2>

      <div className="filter-controls">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(event) => onFilterChange(event.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(event) =>
            onPriorityChange(event.target.value)
          }
        >
          <option value="all">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">Default Order</option>
          <option value="az">Title: A-Z</option>
          <option value="za">Title: Z-A</option>
        </select>
      </div>
    </section>
  );
}

export default TaskFilters;