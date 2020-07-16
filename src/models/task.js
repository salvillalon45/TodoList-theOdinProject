const taskFactory = function(newTaskName, newDescription, newDueDate, newPriority, newNotes)  {
    // Represents a Task object

    let taskName = newTaskName;
    let description = newDescription;
    let dueDate = newDueDate;
    let priority = newPriority;
    let notes = newNotes;

    return {
        taskName, description, dueDate, priority, notes
    };
}

export { taskFactory };