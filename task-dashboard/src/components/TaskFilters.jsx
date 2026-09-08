function TaskFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortOrder,
  onSortChange,
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

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(event) => onFilterChange(event.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
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