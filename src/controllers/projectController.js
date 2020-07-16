import { projectFactory } from "../models/project";

const projectControllerFactory = function()  {

    function createProject(projectName) {
        // This function creates a new project and stores it in Local Storage

        let project = projectFactory(projectName);
        storeInStorage(project.name, project);
    }

    function storeInStorage(projectName, projectObj) {
        // This function stores in Local Storage the project Obj

        window.localStorage.setItem(projectName, JSON.stringify(projectObj));
    }

    function deleteProject(projectName) {
        // This function deletes a project from storage

        window.localStorage.removeItem(projectName);
    }

    return {
        createProject, deleteProject
    };
}

export { projectControllerFactory };