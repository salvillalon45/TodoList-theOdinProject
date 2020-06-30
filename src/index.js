import { projectControllerFactory } from "./controllers/projectController";
import { projectViewFactory } from "./pages/projectsView";

console.log("Inside index.js");

let projectController = projectControllerFactory();
let projectView = projectViewFactory();

projectView.render();

document.getElementById("input-project").addEventListener("change", function(event) {
    let projectTitle = document.getElementById("input-project").value;
    console.log(projectTitle);
    projectController.createProject(projectTitle);
    projectView.createUserProject(projectTitle);
    document.getElementById("input-project").value = "";
});

