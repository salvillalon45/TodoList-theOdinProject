import { projectControllerFactory } from "./controllers/projectController";
import { projectViewFactory } from "./pages/projectView";
import { taskViewFactory} from "./pages/taskView";
import { taskControllerFactory } from "./controllers/taskController";

console.log("Inside index.js");

let projectController = projectControllerFactory();
let projectView = projectViewFactory();
let taskView = taskViewFactory();
let taskController = taskControllerFactory();

let project1Task1 = {
    taskName: "Create A New Project",
    Description: "To create a new Project, type its name in the field in the left pane, then press Enter button.",
    Due:"2020-06-29",
    Priority: "high"
}

let project1Task2 = {
    taskName: "Take out trash",
    Description: "Take out trash every sunday",
    Due:"2020-06-29",
    Priority: "high"
}

let project1 = {
    name: "Project 1",
    tasks: [project1Task1, project1Task2]
}

let project2Task1 = {
    taskName: "PROJECT TWO TASK 1",
    Description: "To create a new Project, type its name in the field in the left pane, then press Enter button.",
    Due:"2020-06-29",
    Priority: "high"
}

let project2Task2 = {
    taskName: "PROJECT TWO TASK 2",
    Description: "Take out trash every sunday",
    Due:"2020-06-29",
    Priority: "high"
}

let project2 = {
    name: "Project 2",
    tasks: [project2Task1, project2Task2]
}

window.localStorage.setItem(project1.name, JSON.stringify(project1));
window.localStorage.setItem(project2.name, JSON.stringify(project2));

projectView.render();
taskView.render();
// document.getElementById("input-project").addEventListener("change", function(event) {
//     let projectTitle = document.getElementById("input-project").value;
//     console.log(projectTitle);
//     projectController.createProject(projectTitle);
//     projectView.createUserProject(projectTitle);
//     document.getElementById("input-project").value = "";
// });

function createEventListeners() {
    console.log("inside createEventListeners");

    let userProjectArray = Array.from(document.querySelectorAll(".user-project"));

    for (let i = 0; i < userProjectArray.length; i++) {
        let userProject = userProjectArray[i];

        userProject.addEventListener("click", function () {
            let projectName = this.innerHTML;

            projectView.removeActiveForAllUserProject();
            projectView.insertActiveInUserProject(i);
            taskView.renderTasksForProjectView(projectName);
        });
    }
}

document.querySelector(".add-task-btn").addEventListener("click", function() {
    taskView.openForm();
});

function executeSubmitButton() {
    document.querySelector(".submit-btn").addEventListener("click", function() {

        let newTitle = document.forms["TaskForm"]["title"];
        console.log(newTitle.value);
        let newDescription = document.forms["TaskForm"]["description"];
        console.log(newDescription.value);
        let newDueDate = document.forms["TaskForm"]["date"];
        console.log(newDueDate.value);
        let newPriority = document.forms["TaskForm"]["priority"];
        console.log(newPriority.value);

        taskController.createTask(newTitle.value, newDescription.value, newDueDate.value, newPriority.value);
        taskView.closeForm();
    });
}

document.querySelector(".cancel-btn").addEventListener("click", function() {
    taskView.closeForm();
});

executeSubmitButton();
createEventListeners();

