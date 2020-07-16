const projectFactory = function(newName)  {
    // Represents a Project. A project contains the name of the project and tasks

    let name = newName;
    let tasks = [];

    return {
        name, tasks
    };
}

export { projectFactory };