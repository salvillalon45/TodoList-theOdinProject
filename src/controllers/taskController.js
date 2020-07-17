import { taskFactory } from "../models/task";

const taskControllerFactory = function()  {

    function getProject() {
        // This function is used to get the selected project. This is useful so that we can the tasks from this
        // project and insert a new one

        const selectedProject = document.querySelector(".active");
        let projectName = selectedProject.textContent;

        return JSON.parse(window.localStorage.getItem(projectName));
    }

    function createTask(newTaskName, newDescription, newDueDate, newPriority, newNotes) {
        // This function creates a new task and adds it to the project's task array

        let project = getProject();
        let task = taskFactory(newTaskName, newDescription, newDueDate, newPriority, newNotes);
        project.tasks.push(task);

        storeInStorage(project.name, project);
    }

    function updateTask(newTaskName, newDescription, newDueDate, newPriority, newNotes, index) {
        // This function creates updates a selected task

        let project = getProject();
        let projectTasks = project.tasks[index];

        projectTasks.taskName = newTaskName;
        projectTasks.description = newDescription;
        projectTasks.dueDate = newDueDate;
        projectTasks.priority = newPriority;
        projectTasks.notes = newNotes;
        project.tasks[index] = projectTasks;

        storeInStorage(project.name, project);
    }

    function storeInStorage(projectName, projectObj) {
        // This function stores in Local Storage the project Obj

        window.localStorage.setItem(projectName, JSON.stringify(projectObj));
    }

    function deleteTask(index) {
        // This function deletes a task from the tasks array and updates it in the storage

        let project = getProject();
        project.tasks.splice(Number(index), 1);

        storeInStorage(project.name, project);
    }

    return {
        createTask, deleteTask, updateTask
    };
}

export { taskControllerFactory };