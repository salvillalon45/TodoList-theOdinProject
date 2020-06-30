import { projectFactory } from "../models/project";

const projectControllerFactory = function()  {

    let project = projectFactory();

    function createProject(projectTitle) {
        console.log("Inside createProject()");

        project.name = projectTitle;

        console.log(project.name);
        console.log(project.tasks);
        storeInStorage(projectTitle);
    }

    function storeInStorage(projectTitle) {
        console.log("Inside storeInStorage()");
        window.localStorage.setItem(projectTitle, projectTitle);
    }

    return {
        createProject
    };
}

export { projectControllerFactory };