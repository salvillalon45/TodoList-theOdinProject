import { projectFactory } from "../models/project";

const projectControllerFactory = function()  {

    function createProject(projectName) {
        let project = projectFactory(projectName);
        storeInStorage(project.name, project);
    }

    function storeInStorage(projectName, projectObj) {
        window.localStorage.setItem(projectName, JSON.stringify(projectObj));
    }

    function deleteProject(projectName) {
        window.localStorage.removeItem(projectName);
    }

    return {
        createProject, deleteProject
    };
}

export { projectControllerFactory };