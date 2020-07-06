import { projectFactory } from "../models/project";

const projectControllerFactory = function()  {

    let project = projectFactory();

    function createProject(projectTitle) {
        console.log("Inside createProject()");

        project.name = projectTitle;
        storeInStorage(project.name, project);
    }

    function storeInStorage(projectTitle, projectObj) {
        console.log("Inside storeInStorage()");
        window.localStorage.setItem(projectTitle, projectObj);
    }

    return {
        createProject
    };
}

export { projectControllerFactory };