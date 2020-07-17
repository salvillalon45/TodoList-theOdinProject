import { projectControllerFactory } from "../controllers/projectController";
import { projectViewFactory } from "../pages/projectView";
import { taskViewFactory} from "../pages/taskView";
import { taskControllerFactory } from "../controllers/taskController";

console.log("Inside combine.js");

const projectController = projectControllerFactory();
const projectView = projectViewFactory();
const taskView = taskViewFactory();
const taskController = taskControllerFactory();

function createHeader() {
    // This function creates the header of the website

    const introContainer = document.createElement("div");
    const header = document.createElement("header");
    const navContainer = document.createElement("div");
    const logoContainer = document.createElement("div");
    introContainer.classList.add("intro-container");
    navContainer.classList.add("nav-container");
    logoContainer.classList.add("logo-container");

    const logo = document.createElement("p");
    logo.classList.add("logo");
    logo.innerHTML = "The Todo List App";

    logoContainer.append(logo);
    navContainer.append(logoContainer);

    const navLinks = document.createElement("nav");
    const ul = document.createElement("ul");
    ul.classList.add("menu");
    ul.innerHTML = '<li class="nav-link"><a href="https://salvillalon45.github.io/">About Developer</a></li>' + '<li class="nav-link"><a href="https://www.linkedin.com/in/salvadorvillalon/">LinkedIn</a></li>';
    navLinks.append(ul);

    navContainer.append(navLinks);
    header.append(navContainer);
    introContainer.append(header);
    document.querySelector("#content").append(introContainer);
}

function createDefaultProject() {
    // This function creates a default project to get the user started

    const defaultProjectTask1 = {
        taskName: "Default task 1",
        description: "Description for default task 1",
        dueDate: "2020-06-29",
        priority: "high",
        notes: "Need to start this task"
    }

    const defaultProjectTask2 = {
        taskName: "Default task 2",
        description: "Description for default task 2",
        dueDate:"2020-06-29",
        priority: "high",
        notes: "Need to start this task"
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
    // This function creates event listeners for all the projects that appear on the project pane

    let userProjectArray = Array.from(document.querySelectorAll(".user-project-text"));

    for (let i = 0; i < userProjectArray.length; i++) {
        let userProject = userProjectArray[i];

        userProject.addEventListener("click", function () {
            let projectName = this.textContent;
            projectView.removeActiveForAllUserProject();
            projectView.insertActiveInUserProject(i);
            taskView.renderUserTaskDetails(projectName);
            createEventListenerForTrashIconTasks(projectName);
            createEventListenerForEditIconTasks(projectName);
            creatEventListenerForEditTaskCancelButton(projectName);
        });
    }
}

function executeSubmitButtonForProjectForm() {
    // This function executes when the user creates a new project

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
    // This functions creates an event listener for the add project button

    document.querySelector(".add-project-btn").addEventListener("click", function() {
        executeSubmitButtonForProjectForm();
        projectView.openForm();
    });
}

function closeProjectForm() {
    // This function creates an event listener for the cancel project button

    document.querySelector(".project-cancel-btn").addEventListener("click", function() {
        projectView.closeForm();
    });
}

function createEventListenerForTrashIconProjects() {
    // This function creates an event listener for the trash icon for each project

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
    // This function creates an event listener for the trash icon for each task detail container

    let trashIconArray = Array.from(document.querySelectorAll(".task-trash-icon"));
    let userTaskDetailContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));

    for (let i = 0; i < userTaskDetailContainerArray.length; i++) {
        let trashIcon = trashIconArray[i];
        let userTaskDetailContainer = userTaskDetailContainerArray[i];

        trashIcon.addEventListener("click", function() {
            let index = userTaskDetailContainer.id;
            taskView.deleteTaskFromView(index);
            taskController.deleteTask(index);
            taskView.renderUserTaskDetails(projectName);
            createEventListenerForTrashIconTasks(projectName);
        });
    }
}

function createEventListenerForEditIconTasks(projectName) {
    console.log("Inside createEventListenerForEditIconTasks");

    let editIconArray = Array.from(document.querySelectorAll(".task-edit-icon"));
    let userTaskDetailContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));

    for (let i = 0; i < userTaskDetailContainerArray.length; i++) {
        let editIcon = editIconArray[i];
        let userTaskDetailContainer = userTaskDetailContainerArray[i];

        editIcon.addEventListener("click", function() {
            console.log("Clicked on edit icon");
            let index = userTaskDetailContainer.id;

            taskView.openEditTaskForm();
            taskView.populateEditTaskForm(index);
            // taskView.renderUserTaskDetails(projectName);
            createEventListenerForEditIconTasks(projectName);
        });
    }
}

function creatEventListenerForEditTaskCancelButton() {
    console.log("Inside createEventListenerForEditCancelButton()");

    document.querySelector(".edit-task-cancel-btn").addEventListener("click", function() {
        console.log("Clicked on the Edit Task Cancel Button");

        taskView.closeEditTaskForm();
        creatEventListenerForEditTaskCancelButton();
    });
}

function executeSubmitButtonForEditTaskForm() {
    // This function executes when the user updates a task for a project
    
    document.querySelector(".edit-task-submit-btn").addEventListener("click", function(event) {
        event.stopImmediatePropagation();

        let newTitle = document.forms["EditTaskForm"]["title"];
        let newDescription = document.forms["TaskForm"]["description"];
        let newDueDate = document.forms["TaskForm"]["date"];
        let newPriority = document.forms["TaskForm"]["priority"];
        let newNotes = document.forms["TaskForm"]["notes"];

        taskController.createTask(newTitle.value, newDescription.value, newDueDate.value, newPriority.value, newNotes.value);
        const projectName = document.querySelector(".active").textContent;
        taskView.renderUserTaskDetails(projectName);
        createEventListenerForEditIconTasks(projectName);
        createEventListenerForTrashIconTasks(projectName);
        taskView.closeForm();
    });
}

function createEventListenerForAddTaskButton() {
    // This function creates an event listener for the add a new task button

    document.querySelector(".add-task-btn").addEventListener("click", function() {
        const openFormCheck = executeSubmitButtonForTaskForm();
        if (openFormCheck !== null) {
            taskView.openForm();
        }
    });
}

function executeSubmitButtonForTaskForm() {
    // This function executes when the user creates a new task for a project

    const projectCheck = document.querySelector(".active");

    if (projectCheck === null) {
        alert("You need to select a project first");
        return null;
    }
    else {
        document.querySelector(".task-submit-btn").addEventListener("click", function(event) {
            event.stopImmediatePropagation();

            let newTitle = document.forms["TaskForm"]["title"];
            let newDescription = document.forms["TaskForm"]["description"];
            let newDueDate = document.forms["TaskForm"]["date"];
            let newPriority = document.forms["TaskForm"]["priority"];
            let newNotes = document.forms["TaskForm"]["notes"];

            taskController.createTask(newTitle.value, newDescription.value, newDueDate.value, newPriority.value, newNotes.value);
            const projectName = document.querySelector(".active").textContent;
            taskView.renderUserTaskDetails(projectName);
            createEventListenerForEditIconTasks(projectName);
            createEventListenerForTrashIconTasks(projectName);
            taskView.closeForm();
        });
    }
}

function closeTaskForm() {
    // This function closes the task form

    document.querySelector(".task-cancel-btn").addEventListener("click", function() {
        taskView.closeForm();
    });
}

export {
    createHeader,
    createDefaultProject,
    projectView, taskView,
    createEventListenersForUserProject, createEventListenerForAddProjectButton,
    createEventListenerForTrashIconProjects, closeProjectForm,
    createEventListenerForAddTaskButton, closeTaskForm, creatEventListenerForEditTaskCancelButton
}