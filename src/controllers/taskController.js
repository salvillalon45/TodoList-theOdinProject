import { taskFactory } from "../models/task";

const taskControllerFactory = function()  {

    function getProject() {
        const selectedProject = document.querySelector(".active");
        let projectName = selectedProject.innerHTML;
        return JSON.parse(window.localStorage.getItem(projectName));
    }

    function createTask(newTaskName, newDescription, newDueDate, newPriority) {
        let project = getProject();
        let task = taskFactory(newTaskName, newDescription, newDueDate, newPriority);
        project.tasks.push(task);

        storeInStorage(project.name, project);
    }

    function storeInStorage(projectName, projectObj) {
        window.localStorage.setItem(projectName, JSON.stringify(projectObj));
    }

    function deleteTask(index) {
        let project = getProject();

        console.table(project.tasks);
        project.tasks.splice(Number(index), 1);
        console.table(project.tasks);

        storeInStorage(project.name, project);
    }

    return {
        createTask, deleteTask
    };
}

export { taskControllerFactory };