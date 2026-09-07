function TaskControls ({ onAddTask, onClearCompleted }) {
    return (
        <section className="task-controls">
            <button onClick={onAddTask}>
                Add new Task
            </button>
            <button onClick={onClearCompleted}>
                Clear Completed Task
            </button>
        </section>
    );
}

export default TaskControls;