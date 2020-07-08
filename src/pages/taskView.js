const taskViewFactory = function()  {

    const content = document.querySelector("#content");
    const main = document.querySelector("main");

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("tasks-container");

    function createTaskContainerIntro() {
        const taskIntroContainer = document.createElement("div");
        const title = document.createElement("h2");
        const addTaskBtn = document.createElement("button");

        addTaskBtn.classList.add("add-task-btn");
        taskIntroContainer.classList.add("intro-task-container");

        title.textContent = "Tasks";
        addTaskBtn.textContent = "Add Task";

        taskIntroContainer.append(title);
        taskIntroContainer.append(addTaskBtn);
        taskContainer.append(taskIntroContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function createUserTaskContainer() {
        console.log("Inside createUserTaskContainer()");

        const userTaskContainer = document.createElement("div");
        userTaskContainer.classList.add("user-task-container");

        taskContainer.append(userTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function createUserTask(taskName) {
        console.log("Inside createUserTask()");

        const userTask = document.createElement("p");
        userTask.classList.add("user-task");

        userTask.innerHTML = taskName;

        const userTaskContainer = document.querySelector(".user-task-container");
        userTaskContainer.append(userTask);
        taskContainer.append(userTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function createUserTaskDetails(name, description, dueDate, priority, userTaskContainer, index) {
        const userTaskDetailsContainer = document.createElement("div");
        userTaskDetailsContainer.classList.add("user-tasks-details-container");
        userTaskDetailsContainer.setAttribute("id", index);

        const nameDOM = document.createElement("h3");
        nameDOM.classList.add("task-name");
        nameDOM.innerHTML = name;

        const descriptionDOM = document.createElement("p");
        descriptionDOM.classList.add("task-description");
        descriptionDOM.innerHTML = "<strong>Task Description: </strong>" + description;

        const dueDateDOM = document.createElement("p");
        dueDateDOM.classList.add("task-due-date");
        dueDateDOM.innerHTML = "<strong>Due Date: </strong>" + dueDate;

        const priorityDOM = document.createElement("p");
        priorityDOM.classList.add("task-priority");
        priorityDOM.innerHTML = "<strong>Priority: </strong>" + priority;

        const iconsContainer = document.createElement("div");
        iconsContainer.classList.add("icons-container");

        const trash = document.createElement("p");
        trash.classList.add("trash-icon");
        trash.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

        const edit = document.createElement("p");
        edit.classList.add("edit-icon");
        edit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>\n';

        userTaskDetailsContainer.append(nameDOM);
        userTaskDetailsContainer.append(descriptionDOM);
        userTaskDetailsContainer.append(dueDateDOM);
        userTaskDetailsContainer.append(priorityDOM);
        iconsContainer.append(edit);
        iconsContainer.append(trash);
        userTaskDetailsContainer.append(iconsContainer);
        userTaskContainer.append(userTaskDetailsContainer);
    }

    function renderUserTaskDetails(projectName) {
        removeTasksForProjectView();

        const userTaskContainer = document.querySelector(".user-task-container");
        const projectSelected = JSON.parse(window.localStorage.getItem(projectName));
        const tasks = projectSelected.tasks;
        console.table(tasks);
        for (let i = 0; i < tasks.length; i++) {
            const name = tasks[i].taskName;
            const description = tasks[i].description;
            const dueDate = tasks[i].dueDate;
            const priority = tasks[i].priority;
            console.log(name);
            console.log(description);
            console.log(dueDate);
            console.log(priority);

            createUserTaskDetails(name, description, dueDate, priority, userTaskContainer, i);
        }

        taskContainer.append(userTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }


    function renderTasksForProjectView(projectName) {
        console.log("Inside renderTasksForProject");

        removeTasksForProjectView();

        const userTaskContainer = document.querySelector(".user-task-container");
        let projectSelected = JSON.parse(window.localStorage.getItem(projectName));
        let tasks = projectSelected.tasks;

        for (let i = 0; i < tasks.length; i++) {
            const userTask = document.createElement("p");
            userTask.classList.add("user-task");
            userTask.innerHTML = tasks[i].taskName;

            userTaskContainer.append(userTask);
        }

        taskContainer.append(userTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function removeTasksForProjectView() {
        console.log("Inside removeTasksFromView()");

        const userTaskContainer = document.querySelector(".user-task-container");

        while (userTaskContainer.firstChild) {
            userTaskContainer.removeChild(userTaskContainer.firstChild);
        }
    }

    function deleteTaskFromView(index) {
        console.log("Inside deleteTaskFromView()");

        const userTaskContainer = document.querySelector(".user-task-container");
        const userTaskDetailContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));

        for (let i = 0; i < userTaskDetailContainerArray.length; i++) {
            let id = userTaskDetailContainerArray[i].id;

            if (id === index) {
                userTaskContainer.removeChild(userTaskDetailContainerArray[id]);
                const userTaskDetailContainerArray1 = Array.from(document.querySelectorAll(".user-tasks-details-container"));
            }
        }
    }

    function createTaskForm() {
        const taskFormPage = document.createElement("div");
        const taskForm = document.createElement("form");
        taskFormPage.classList.add("task-form-page");
        taskFormPage.classList.add("hidden");
        taskForm.name = "TaskForm";

        let titleLabel = document.createElement('label');
        titleLabel.setAttribute("for", "title");
        titleLabel.innerHTML = "Task Title : ";
        taskForm.append(titleLabel);

        let titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("name", "title");
        titleInput.setAttribute("id", "title");
        taskForm.append(titleInput);

        let descriptionLabel = document.createElement("label");
        descriptionLabel.innerHTML = "Description : ";
        descriptionLabel.setAttribute("for", "description");
        taskForm.append(descriptionLabel);

        let descriptionArea = document.createElement("textarea");
        descriptionArea.setAttribute("rows", "10");
        descriptionArea.setAttribute("cols", "40");
        descriptionArea.setAttribute("name", "description");
        taskForm.append(descriptionArea);

        let dateLabel = document.createElement("label");
        dateLabel.innerHTML = "Select Date : ";
        dateLabel.setAttribute("for", "date");
        taskForm.append(dateLabel);

        let dateInput = document.createElement("input");
        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("name", "date");
        dateInput.setAttribute("id", "date");
        dateInput.setAttribute("value", "yyyy-dd-mm");
        taskForm.append(dateInput);

        let priorityLabel = document.createElement("label");
        priorityLabel.innerHTML = "Select Priority : ";
        priorityLabel.setAttribute("for", "priority");
        taskForm.append(priorityLabel);

        let selectPriority = document.createElement("select");
        let low = document.createElement("option");
        let normal = document.createElement("option");
        let high = document.createElement("option");
        let urgent = document.createElement("option");
        selectPriority.setAttribute("name", "priority");
        selectPriority.classList.add("select-priority");

        low.innerHTML = "low";
        normal.innerHTML = "normal";
        high.innerHTML = "high";
        urgent.innerHTML = "urgent";

        selectPriority.append(low);
        selectPriority.append(normal);
        selectPriority.append(high);
        selectPriority.append(urgent);
        taskForm.append(selectPriority);

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        let submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "button");
        submitBtn.classList.add("submit-btn");
        submitBtn.innerHTML = "Submit";

        let cancelBtn = document.createElement("button");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.classList.add("cancel-btn");
        cancelBtn.innerHTML = "Cancel";

        buttonContainer.append(submitBtn);
        buttonContainer.append(cancelBtn);
        taskForm.append(buttonContainer);

        taskFormPage.append(taskForm);
        main.append(taskFormPage);
        content.append(main);
    }

    function openForm() {
        let formPage = document.querySelector(".task-form-page");
        formPage.classList.remove("hidden");
    }

    function closeForm() {
        let formPage = document.querySelector(".task-form-page");
        formPage.classList.add("hidden");
        clearFormFields();
    }

    function clearFormFields() {
        document.forms["TaskForm"].reset();
    }

    function render() {
        createTaskContainerIntro();
        createUserTaskContainer();
        createTaskForm();
    }

    return {
        render, renderTasksForProjectView, removeTasksForProjectView,
        createUserTask, openForm, closeForm, renderUserTaskDetails, deleteTaskFromView
    }
}

export { taskViewFactory };