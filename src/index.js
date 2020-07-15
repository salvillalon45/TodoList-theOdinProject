import { projectControllerFactory } from "./controllers/projectController";
import { projectViewFactory } from "./pages/projectView";
import { taskViewFactory} from "./pages/taskView";
import { taskControllerFactory } from "./controllers/taskController";

console.log("Inside index.js");

const projectController = projectControllerFactory();
const projectView = projectViewFactory();
const taskView = taskViewFactory();
const taskController = taskControllerFactory();


// <div class="intro-container">
//     <header>
//     <div class="nav-container">
//     <div class="logo-container">
//     <p class="logo">The Todo List App</p>
// </div>
//
// <nav class="nav-links">
//     <ul class="menu">
//     <li class="nav-link"><a href="https://salvillalon45.github.io/">About Developer</a></li>
// <li class="nav-link"><a href="https://www.linkedin.com/in/salvadorvillalon/">LinkedIn</a></li>
// </ul>
// </nav>
// </div>
// </header>
// </div>

function createHeader() {
    const introContainer = document.createElement("div");
    const header = document.createElement("header");
    const navContainer = document.createElement("div");
    const logoContainer = document.createElement("div");
    introContainer.classList.add("intro-container");
    navContainer.classList.add("nav-container");
    logoContainer.classList.add("logo-container");
    // const log
}

function createDefaultProject() {
    const defaultProjectTask1 = {
        taskName: "Default task 1",
        description: "Description for default task 1",
        dueDate: "2020-06-29",
        priority: "high"
    }

    const defaultProjectTask2 = {
        taskName: "Default task 2",
        description: "Description for default task 2",
        dueDate:"2020-06-29",
        priority: "high"
    }

    const defaultProject = {
        name: "Default Project",
        tasks: [defaultProjectTask1, defaultProjectTask2]
    }

    window.localStorage.setItem(defaultProject.name, JSON.stringify(defaultProject));
}

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
        createEventListenersForUserProject();
        createEventListenerForTrashIconProjects();
    });
}

function createEventListenerForAddProjectButton() {
    document.querySelector(".add-project-btn").addEventListener("click", function() {
        executeSubmitButtonForProjectForm();
        projectView.openForm();
    });
}

function closeProjectForm() {
    document.querySelector(".project-cancel-btn").addEventListener("click", function() {
        projectView.closeForm();
    });
}

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
            projectView.renderProjects();
            createEventListenerForTrashIconProjects();
        });
    }
}

// ------------------------------------------------------------------------------------------------------------------------
//
// TASKS PANE
//
// ------------------------------------------------------------------------------------------------------------------------
function createEventListenerForTrashIconTasks(projectName) {
    let trashIconArray = Array.from(document.querySelectorAll(".task-trash-icon"));
    let userTaskDetailContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));

    for (let i = 0; i < userTaskDetailContainerArray.length; i++) {
        let trashIcon = trashIconArray[i];
        let userTaskDetailContainer = userTaskDetailContainerArray[i];
        trashIcon.addEventListener("click", function(event) {

            let index = userTaskDetailContainer.id;
            taskView.deleteTaskFromView(index);
            taskController.deleteTask(index);
            taskView.renderUserTaskDetails(projectName);
            createEventListenerForTrashIconTasks(projectName);
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

createDefaultProject();

projectView.render();
taskView.render();

createEventListenersForUserProject();
createEventListenerForAddProjectButton();
createEventListenerForTrashIconProjects();
closeProjectForm();

createEventListenerForAddTaskButton();
closeTaskForm();