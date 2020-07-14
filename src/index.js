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
    description: "To create a new Project, type its name in the field in the left pane, then press Enter button.",
    dueDate:"2020-06-29",
    priority: "high"
}

let project1Task2 = {
    taskName: "Take out trash",
    description: "Take out trash every sunday",
    dueDate:"2020-06-29",
    priority: "high"
}

let project1 = {
    name: "Project 1",
    tasks: [project1Task1, project1Task2]
}

let project2Task1 = {
    taskName: "PROJECT TWO TASK 1",
    description: "To create a new Project, type its name in the field in the left pane, then press Enter button.",
    dueDate:"2020-06-29",
    priority: "high"
}

let project2Task2 = {
    taskName: "PROJECT TWO TASK 2",
    description: "Take out trash every sunday",
    dueDate:"2020-06-29",
    priority: "high"
}

let project2 = {
    name: "Project 2",
    tasks: [project2Task1, project2Task2]
}

window.localStorage.setItem(project1.name, JSON.stringify(project1));
window.localStorage.setItem(project2.name, JSON.stringify(project2));

projectView.render();
taskView.render();

// ------------------------------------------------------------------------------------------------------------------------
//
// PROJECTS PANE
//
// ------------------------------------------------------------------------------------------------------------------------
function createEventListenersForUserProject() {
    let userProjectArray = Array.from(document.querySelectorAll(".user-project-text"));

    for (let i = 0; i < userProjectArray.length; i++) {
        let userProject = userProjectArray[i];

        userProject.addEventListener("click", function () {
            let projectName = this.textContent;
            projectView.removeActiveForAllUserProject();
            projectView.insertActiveInUserProject(i);
            // When they click on project we want them to show all tasks
            taskView.renderUserTaskDetails(projectName);
            createEventListenerForTrashIconTasks(projectName);
        });
    }
}

function executeSubmitButtonForProjectForm() {
    document.querySelector(".project-submit-btn").addEventListener("click", function(event) {
        event.stopImmediatePropagation();

        let newProjectName = document.forms["ProjectForm"]["name"].value;

        projectController.createProject(newProjectName)
        projectView.createUserProject(newProjectName);
        projectView.closeForm();
        projectView.renderProjects();
    });
}

function createEventListenerForAddProjectButton() {
    document.querySelector(".add-project-btn").addEventListener("click", function() {
        executeSubmitButtonForProjectForm();
        projectView.openForm();
    });
}

// function closeProjectForm() {
//     document.querySelector(".project-cancel-btn").addEventListener("click", function() {
//         console.log("Click on cancel create project button");
//         projectView.closeForm();
//     });
// }

function createEventListenerForTrashIconProjects() {
    let trashIconArray = Array.from(document.querySelectorAll(".project-trash-icon"));
    let userProjectArray = Array.from(document.querySelectorAll(".user-project"));

    for (let i = 0; i < userProjectArray.length; i++) {
        let trashIcon = trashIconArray[i];
        let userProject = userProjectArray[i];

        trashIcon.addEventListener("click", function() {
            const projectName = userProjectArray[i].textContent;

            let index = userProject.id;
            projectView.deleteProjectFromView(index);
            projectController.deleteProject(projectName);
            // projectView.renderProjects();
        });
    }
}

createEventListenersForUserProject();
createEventListenerForAddProjectButton();
createEventListenerForTrashIconProjects();

// ------------------------------------------------------------------------------------------------------------------------
//
// TASKS PANE
//
// ------------------------------------------------------------------------------------------------------------------------
function createEventListenerForTrashIconTasks(projectName) {
    console.log("Inside createEventListenerForTrashIconTasks()");

    let trashIconArray = Array.from(document.querySelectorAll(".task-trash-icon"));
    let userTaskDetailContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));

    for (let i = 0; i < userTaskDetailContainerArray.length; i++) {
        let trashIcon = trashIconArray[i];
        let userTaskDetailContainer = userTaskDetailContainerArray[i];
        console.log(trashIcon)
        trashIcon.addEventListener("click", function(event) {
            console.log("Clicking on trash icon");

            let index = userTaskDetailContainer.id;
            taskView.deleteTaskFromView(index);
            taskController.deleteTask(index);
            // taskView.renderUserTaskDetails(projectName);
        });
    }
}

function createEventListenerForAddTaskButton() {
    document.querySelector(".add-task-btn").addEventListener("click", function() {
        const openFormCheck = executeSubmitButtonForTaskForm();
        if (openFormCheck !== null) {
            taskView.openForm();
        }
    });
}

function executeSubmitButtonForTaskForm() {
    const projectCheck = document.querySelector(".active");

    if (projectCheck === null) {
        alert("You need to select a project first");
        return null;
    }
    else {
        document.querySelector(".task-submit-btn").addEventListener("click", function() {
            let newTitle = document.forms["TaskForm"]["title"];
            let newDescription = document.forms["TaskForm"]["description"];
            let newDueDate = document.forms["TaskForm"]["date"];
            let newPriority = document.forms["TaskForm"]["priority"];

            taskController.createTask(newTitle.value, newDescription.value, newDueDate.value, newPriority.value);
            const projectName = document.querySelector(".active").textContent;
            taskView.renderUserTaskDetails(projectName);
            taskView.closeForm();
        });
    }
}

function closeTaskForm() {
    document.querySelector(".task-cancel-btn").addEventListener("click", function() {
        taskView.closeForm();
    });
}

createEventListenerForAddTaskButton();

closeTaskForm();