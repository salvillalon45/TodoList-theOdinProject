import { taskFactory } from "../models/task";

// let project2Task2 = {
//     taskName: "PROJECT TWO TASK 2",
//     Description: "Take out trash every sunday",
//     Due:"2020-06-29",
//     Priority: "high"
// }
//
// let project2 = {
//     name: "Project 2",
//     tasks: [project2Task1, project2Task2]
// }


const taskControllerFactory = function()  {

    function getProject() {
        const selectedProject = document.querySelector(".active");
        let projectName = selectedProject.innerHTML;
        return JSON.parse(window.localStorage.getItem(projectName));
    }

    function createTask(newTaskName, newDescription, newDueDate, newPriority) {
        console.log("Inside createTask()");
        let project = getProject();

        let task = taskFactory(newTaskName, newDescription, newDueDate, newPriority);
        project.tasks.push(task);

        storeInStorage(project.name, project);
    }

    function storeInStorage(projectName, projectObj) {
        console.log("Inside storeInStorage()");

        window.localStorage.setItem(projectName, projectObj);
    }

    return {
        createTask
    };
}

export { taskControllerFactory };