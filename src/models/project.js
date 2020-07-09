const projectFactory = function(newName)  {

    let name = newName;
    let tasks = [];
    console.log(name);
    console.log("EXPECT EMTPY ARRAY:: " + tasks)
    return {
        name, tasks
    };
}

export { projectFactory };