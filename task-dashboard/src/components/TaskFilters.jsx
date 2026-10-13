
function TaskFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortOrder,
  onSortChange,
  priorityFilter,
  onPriorityChange,
  onClearFilters,
}) {
  return (
    <section className="task-filters">
      <h2>Search & Filter Tasks</h2>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(event) => onFilterChange(event.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">Default Order</option>
          <option value="az">Title: A-Z</option>
          <option value="za">Title: Z-A</option>
        </select>

        <button type="button" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </section>
  );
}

export default TaskFilters;


