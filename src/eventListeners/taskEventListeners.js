import {taskViewFactory} from "../pages/taskView";
import {taskControllerFactory} from "../controllers/taskController";

let taskView = taskViewFactory();
let taskController = taskControllerFactory();

function createEventListenerTrashIcon(projectName) {
    let trashIconArray = Array.from(document.querySelectorAll(".trash-icon"));
    let userTaskDetailContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));

    for (let i = 0; i < userTaskDetailContainerArray.length; i++) {
        let trashIcon = trashIconArray[i];
        let userTaskDetailContainer = userTaskDetailContainerArray[i];

        trashIcon.addEventListener("click", function() {
            let index = userTaskDetailContainer.id;
            taskView.deleteTaskFromView(index);
            taskController.deleteTask(index);
            taskView.renderUserTaskDetails(projectName);
            createEventListenerTrashIcon(projectName);
        });
    }
}
