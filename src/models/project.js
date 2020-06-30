const projectFactory = function(newName)  {

    let name = newName;
    let tasks = [];

    return {
        name, tasks
    };
}

export { projectFactory };