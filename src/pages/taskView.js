const taskViewFactory = function()  {

    const content = document.querySelector("#content");
    const main = document.querySelector("main");

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("tasks-container");
    taskContainer.innerHTML = "<h2>Tasks</h2>";

    function createInputTaskContainer() {
        console.log("Inside createInputTaskContainer()");

        const inputTaskContainer = document.createElement("div");
        inputTaskContainer.classList.add("input-task-container");

        inputTaskContainer.innerHTML = '<label for="task-project"></label>' + '<input id="input-task" placeholder="New task...">';

        taskContainer.append(inputTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function createUserTaskContainer() {
        console.log("Inside createUserTaskContainer()");

        const userTaskContainer = document.createElement("div");
        userTaskContainer.classList.add("user-task-container");

        taskContainer.append(userTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function createUserTask(taskName) {
        console.log("Inside createUserTask()");

        const userTask = document.createElement("p");
        userTask.classList.add("user-task");

        userTask.innerHTML = taskName;

        const userTaskContainer = document.querySelector(".user-task-container");
        userTaskContainer.append(userTask);
        taskContainer.append(userTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function renderTasksForProject(projectName) {
        console.log("Inside renderTasksForProject");

        const userTaskContainer = document.querySelector(".user-task-container");
        let projectSelected = JSON.parse(window.localStorage.getItem(projectName));
        let tasks = projectSelected.tasks;

        for (let i = 0; i < tasks.length; i++) {
            const userTask = document.createElement("p");
            userTask.classList.add("user-task");
            console.log("What is tasks[i]:: " + tasks[i].taskName);
            userTask.innerHTML = tasks[i].taskName;

            userTaskContainer.append(userTask);
        }

        taskContainer.append(userTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function removeTasksFromView() {
        console.log("Inside removeTasksFromView()");

        const userTaskContainer = document.querySelector(".user-task-container");

        while (userTaskContainer.firstChild) {
            userTaskContainer.removeChild(userTaskContainer.firstChild);
        }
    }

    function render() {
        createInputTaskContainer();
        createUserTaskContainer();
    }

    return {
        render, renderTasksForProjectView: renderTasksForProject, removeTasksForProjectView: removeTasksFromView
    }
}

export { taskViewFactory };