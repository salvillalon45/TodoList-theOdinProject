const taskFactory = function(newTaskName, newDescription, newDue, newPriority)  {

    let taskName = newTaskName;
    let description = newDescription;
    let due = newDue;
    let priority = newPriority;

    return {
        taskName, description, due, priority
    };
}

export { taskFactory };