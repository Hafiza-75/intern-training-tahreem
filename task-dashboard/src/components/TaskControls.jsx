function TaskControls ({onClearCompleted }) {
    return (
        <section className="task-controls">
            <button onClick={onClearCompleted}>
                Clear Completed Task
            </button>
        </section>
    );
}

export default TaskControls;