const taskFactory = function(newTaskName, newDescription, newDueDate, newPriority)  {

    let taskName = newTaskName;
    let description = newDescription;
    let dueDate = newDueDate;
    let priority = newPriority;

    return {
        taskName, description, dueDate, priority
    };
}

export { taskFactory };