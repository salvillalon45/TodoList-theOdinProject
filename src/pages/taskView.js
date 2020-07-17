const taskViewFactory = function()  {

    const content = document.querySelector("#content");
    const main = document.querySelector("main");

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("tasks-container");

    function createTaskContainerIntro() {
        // This function creates the intro header of the Tasks Pane

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
        // This function creates the user-task-container that contains all the user-tasks-details-container

        const userTaskContainer = document.createElement("div");
        userTaskContainer.classList.add("user-task-container");

        taskContainer.append(userTaskContainer);
        main.append(taskContainer);
        content.append(main);
    }

    function createUserTaskDetails(name, description, dueDate, priority, userTaskContainer, index, notes) {
        // This function creates a user-tasks-details-container. This container has all the information of the task

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

        const notesDOM = document.createElement("p");
        notesDOM.classList.add("task-notes");
        notesDOM.innerHTML = "<strong>Notes: </strong>";

        const notesContentDOM = document.createElement("p");
        notesContentDOM.classList.add("task-notes-content");
        notesContentDOM.innerHTML = notes;

        const iconsContainer = document.createElement("div");
        iconsContainer.classList.add("icons-container");

        const trash = document.createElement("p");
        trash.classList.add("task-trash-icon");
        trash.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

        const edit = document.createElement("p");
        edit.classList.add("task-edit-icon");
        edit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>\n';

        userTaskDetailsContainer.append(nameDOM);
        userTaskDetailsContainer.append(descriptionDOM);
        userTaskDetailsContainer.append(dueDateDOM);
        userTaskDetailsContainer.append(priorityDOM);
        userTaskDetailsContainer.append(notesDOM);
        userTaskDetailsContainer.append(notesContentDOM);
        iconsContainer.append(edit);
        iconsContainer.append(trash);
        userTaskDetailsContainer.append(iconsContainer);
        userTaskContainer.append(userTaskDetailsContainer);
    }

    function createEmptyProjectNotice() {
        // This function creates an empty notice in case the project does not have any tasks

        const emptyNoticeContainer = document.createElement("div");
        emptyNoticeContainer.classList.add("empty-notice-container");

        const emptyNotice = document.createElement("p");
        emptyNotice.innerHTML = "<strong>Project has no tasks!</strong>" + "<br>" + "<br>" +" Click on Add Task to add to it!";
        emptyNoticeContainer.append(emptyNotice);

        return emptyNoticeContainer;
    }

    function deleteAllEmptyProjectNotices() {
        // This function deletes all the empty project notices. This is used renderUserTasksDetails so that we can remove all
        // existing empty project notices

        const userTaskContainer = document.querySelector(".user-task-container");
        const emptyNoticeContainerArray = Array.from(document.querySelectorAll(".empty-notice-container"));

        for (let i = 0; i < emptyNoticeContainerArray.length; i++) {
            userTaskContainer.removeChild(emptyNoticeContainerArray[i]);
        }
    }

    function deleteAllTasksFromView() {
        // This function deletes all task from the task view

        const userTaskContainer = document.querySelector(".user-task-container");
        const userTasksDetailsContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));

        for (let i = 0; i < userTasksDetailsContainerArray.length; i++) {
            userTaskContainer.removeChild(userTasksDetailsContainerArray[i]);
        }
    }

    function deleteTaskFromView(index) {
        // This function delete one task from the view

        const userTaskContainer = document.querySelector(".user-task-container");
        const userTaskDetailContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));

        for (let i = 0; i < userTaskDetailContainerArray.length; i++) {
            let id = userTaskDetailContainerArray[i].id;

            if (id === index) {
                userTaskContainer.removeChild(userTaskDetailContainerArray[id]);
            }
        }
    }

    function createTaskForm() {
        // This function creates the Task Form that allows users to create a new task for a project

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

        let notesLabel = document.createElement("label");
        notesLabel.innerHTML = "Notes : ";
        notesLabel.setAttribute("for", "notes");
        taskForm.append(notesLabel);

        let notesArea = document.createElement("textarea");
        notesArea.setAttribute("rows", "10");
        notesArea.setAttribute("cols", "40");
        notesArea.setAttribute("name", "notes");
        taskForm.append(notesArea);

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        let submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "button");
        submitBtn.classList.add("task-submit-btn");
        submitBtn.innerHTML = "Submit";

        let cancelBtn = document.createElement("button");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.classList.add("task-cancel-btn");
        cancelBtn.innerHTML = "Cancel";

        buttonContainer.append(submitBtn);
        buttonContainer.append(cancelBtn);
        taskForm.append(buttonContainer);

        taskFormPage.append(taskForm);
        main.append(taskFormPage);
        content.append(main);
    }

    function openForm() {
        // This function makes the Task Form visible

        let formPage = document.querySelector(".task-form-page");
        formPage.classList.remove("hidden");
    }

    function closeForm() {
        // This function hides the Task Form

        let formPage = document.querySelector(".task-form-page");
        formPage.classList.add("hidden");
        clearFormFields();
    }

    function createEditTaskForm() {
        // This function creates the Edit Task Form that allows users to create a new task for a project

        const editTaskFormPage = document.createElement("div");
        const editTaskForm = document.createElement("form");
        editTaskFormPage.classList.add("edit-task-form-page");
        editTaskFormPage.classList.add("hidden");
        editTaskForm.name = "EditTaskForm";

        let titleLabel = document.createElement('label');
        titleLabel.setAttribute("for", "edit-title");
        titleLabel.innerHTML = "Task Title : ";
        editTaskForm.append(titleLabel);

        let titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("name", "edit-title");
        titleInput.setAttribute("id", "edit-title");
        editTaskForm.append(titleInput);

        let descriptionLabel = document.createElement("label");
        descriptionLabel.innerHTML = "Description : ";
        descriptionLabel.setAttribute("for", "edit-description");
        editTaskForm.append(descriptionLabel);

        let descriptionArea = document.createElement("textarea");
        descriptionArea.setAttribute("rows", "10");
        descriptionArea.setAttribute("cols", "40");
        descriptionArea.setAttribute("name", "edit-description");
        descriptionArea.setAttribute("id", "edit-description");
        editTaskForm.append(descriptionArea);

        let dateLabel = document.createElement("label");
        dateLabel.innerHTML = "Select Date : ";
        dateLabel.setAttribute("for", "edit-date");
        editTaskForm.append(dateLabel);

        let dateInput = document.createElement("input");
        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("name", "edit-date");
        dateInput.setAttribute("id", "edit-date");
        dateInput.setAttribute("value", "yyyy-dd-mm");
        editTaskForm.append(dateInput);

        let priorityLabel = document.createElement("label");
        priorityLabel.innerHTML = "Select Priority : ";
        priorityLabel.setAttribute("for", "edit-priority");
        editTaskForm.append(priorityLabel);

        let selectPriority = document.createElement("select");
        let low = document.createElement("option");
        let normal = document.createElement("option");
        let high = document.createElement("option");
        let urgent = document.createElement("option");
        selectPriority.setAttribute("name", "edit-priority");
        selectPriority.setAttribute("id", "edit-priority");
        selectPriority.classList.add("edit-select-priority");

        low.innerHTML = "low";
        normal.innerHTML = "normal";
        high.innerHTML = "high";
        urgent.innerHTML = "urgent";

        selectPriority.append(low);
        selectPriority.append(normal);
        selectPriority.append(high);
        selectPriority.append(urgent);
        editTaskForm.append(selectPriority);

        let notesLabel = document.createElement("label");
        notesLabel.innerHTML = "Notes : ";
        notesLabel.setAttribute("for", "edit-notes");
        editTaskForm.append(notesLabel);

        let notesArea = document.createElement("textarea");
        notesArea.setAttribute("rows", "10");
        notesArea.setAttribute("cols", "40");
        notesArea.setAttribute("name", "edit-notes");
        notesArea.setAttribute("id", "edit-notes");
        editTaskForm.append(notesArea);

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        let submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "button");
        submitBtn.classList.add("edit-task-submit-btn");
        submitBtn.innerHTML = "Submit";

        let cancelBtn = document.createElement("button");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.classList.add("edit-task-cancel-btn");
        cancelBtn.innerHTML = "Cancel";

        buttonContainer.append(submitBtn);
        buttonContainer.append(cancelBtn);
        editTaskForm.append(buttonContainer);

        editTaskFormPage.append(editTaskForm);
        main.append(editTaskFormPage);
        content.append(main);
    }

    function openEditTaskForm() {
        // This function makes the Edit Task Form visible

        let formPage = document.querySelector(".edit-task-form-page");
        formPage.classList.remove("hidden");
    }

    function closeEditTaskForm() {
        // This function makes the Edit Task Form visible

        let formPage = document.querySelector(".edit-task-form-page");
        formPage.classList.add("hidden");
    }

    function populateEditTaskForm(index) {
        console.log("Inside populateEditTaskForm()");

        const userTaskDetailContainerArray = Array.from(document.querySelectorAll(".user-tasks-details-container"));
        const userTaskDetailContainer = userTaskDetailContainerArray[index];
        const taskName = userTaskDetailContainer.children[0].textContent;
        const taskDescription = userTaskDetailContainer.children[1].textContent.slice(18);
        const taskDueDate = userTaskDetailContainer.children[2].textContent.slice(10);
        const taskPriority = userTaskDetailContainer.children[3].textContent.slice(10);
        const taskNotes = userTaskDetailContainer.children[5].textContent;

        let taskNameField = document.querySelector("#edit-title");
        let taskDescriptionField = document.querySelector("#edit-description");
        let taskDueDateField = document.querySelector("#edit-date");
        let taskPriorityField = document.querySelector("#edit-priority");
        let taskNotesField = document.querySelector("#edit-notes");

        taskNameField.value = taskName;
        taskDescriptionField.value = taskDescription;
        taskDueDateField.value = taskDueDate;
        taskPriorityField.value = taskPriority;
        taskNotesField.value = taskNotes;

    }

    function clearFormFields() {
        // This function clears the fields of the Task Form

        document.forms["TaskForm"].reset();
    }

    function renderUserTaskDetails(projectName) {
        // This function renders all the tasks for a selected project
        // We deleteAllTasksFromView to start so that we remove the tasks from the previous project
        // Same idea with deleteAllEmptyProjectNotices

        deleteAllTasksFromView();

        const emptyNoticeContainer = document.querySelector(".empty-notice-container");
        if (emptyNoticeContainer !== null) {
            deleteAllEmptyProjectNotices();
        }

        const userTaskContainer = document.querySelector(".user-task-container");
        const tasksCheck = JSON.parse(window.localStorage.getItem(projectName));

        if (tasksCheck.tasks.length === 0) {
            const emptyNotice = createEmptyProjectNotice();

            userTaskContainer.append(emptyNotice);
            taskContainer.append(userTaskContainer);
        }
        else {
            const projectSelected = JSON.parse(window.localStorage.getItem(projectName));
            const tasks = projectSelected.tasks;

            for (let i = 0; i < tasks.length; i++) {
                const name = tasks[i].taskName;
                const description = tasks[i].description;
                const dueDate = tasks[i].dueDate;
                const priority = tasks[i].priority;
                const notes = tasks[i].notes;

                createUserTaskDetails(name, description, dueDate, priority, userTaskContainer, i, notes);
            }

            taskContainer.append(userTaskContainer);
        }
    }

    function render() {
        // This function is used to create DOM content that is static

        createTaskContainerIntro();
        createUserTaskContainer();
        createTaskForm();
        createEditTaskForm();
    }

    return {
        render, renderUserTaskDetails,
        deleteTaskFromView,
        openForm, closeForm,
        openEditTaskForm, closeEditTaskForm, populateEditTaskForm
    }
}

export { taskViewFactory };