import { projectFactory } from "../models/project";

const projectControllerFactory = function()  {

    let project = projectFactory();

    function createProject(projectTitle) {
        console.log("Inside createProject()");

        project.name = projectTitle;

        console.log(project.name);
        console.log(project.tasks);
        console.log("what is project:: " + project);

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