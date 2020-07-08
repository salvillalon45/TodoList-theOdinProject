import {projectControllerFactory} from "../controllers/projectController";
import {projectViewFactory} from "../pages/projectView";

let projectController = projectControllerFactory();
let projectView = projectViewFactory();

function createEventListenersForUserProjects() {
    console.log("inside createEventListeners");

    let userProjectArray = Array.from(document.querySelectorAll(".user-project"));

    for (let i = 0; i < userProjectArray.length; i++) {
        let userProject = userProjectArray[i];

        userProject.addEventListener("click", function () {
            let projectName = this.innerHTML;

            projectView.removeActiveForAllUserProject();
            projectView.insertActiveInUserProject(i);
            taskView.renderUserTaskDetails(projectName);
            createEventListenerTrashIcon(projectName);
        });
    }
}