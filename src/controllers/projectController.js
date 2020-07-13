import { projectFactory } from "../models/project";

const projectControllerFactory = function()  {

    function createProject(projectName) {
        console.log("Inside createProject()");

        let project = projectFactory(projectName);
        project.name = projectName;
        console.log("tasks::: --- " + project.tasks)
        storeInStorage(project.name, project);
    }

    function storeInStorage(projectName, projectObj) {
        console.log("Inside storeInStorage()");
        window.localStorage.setItem(projectName, projectObj);
    }

    function deleteProject(projectName) {
        window.localStorage.removeItem(projectName);
    }

    return {
        createProject, deleteProject
    };
}

export { projectControllerFactory };