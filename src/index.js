import { createHeader,
    createDefaultProject,
    projectView, taskView,
    createEventListenersForUserProject, createEventListenerForAddProjectButton,
    createEventListenerForTrashIconProjects, closeProjectForm,
    createEventListenerForAddTaskButton, closeTaskForm } from "./main/combine";

// This file takes everything from combine.js and runs the functions here
createHeader();
createDefaultProject();

projectView.render();
taskView.render();

createEventListenersForUserProject();
createEventListenerForAddProjectButton();
createEventListenerForTrashIconProjects();
closeProjectForm();

createEventListenerForAddTaskButton();
closeTaskForm();