const projectViewFactory = function()  {

    const content = document.querySelector("#content");
    const main = document.querySelector("main");

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("projects-container");

    function createProjectContainerIntro() {
        // This function creates the intro header of the Projects Pane

        const projectIntroContainer = document.createElement("div");
        const title = document.createElement("h2");
        const addProjectBtn = document.createElement("button");

        addProjectBtn.classList.add("add-project-btn");
        projectIntroContainer.classList.add("intro-project-container");

        title.textContent = "Projects";
        addProjectBtn.textContent = "Add Project";

        projectIntroContainer.append(title);
        projectIntroContainer.append(addProjectBtn);
        projectContainer.append(projectIntroContainer);
        main.append(projectContainer);
        content.append(main);
    }

    function createUserProjectContainer() {
        // This function creates the user-project-container that contains all the user-projects

        const userProjectContainer = document.createElement("div");
        userProjectContainer.classList.add("user-project-container");

        projectContainer.append(userProjectContainer);
        main.append(projectContainer);
        content.append(main);
    }

    function createUserProject(projectName) {
        // This function creates a project based on the name given

        const userProject = document.createElement("div");
        userProject.classList.add("user-project");

        const userProjectText = document.createElement("p");
        userProjectText.classList.add("user-project-text");
        userProjectText.innerHTML = projectName;

        const trash = document.createElement("p");
        trash.classList.add("project-trash-icon");
        trash.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

        const userProjectContainer = document.querySelector(".user-project-container");
        userProject.append(userProjectText);
        userProject.append(trash);
        userProjectContainer.append(userProject);
        projectContainer.append(userProjectContainer);
    }

    function insertActiveInUserProject(index) {
        // This function inserts active on the class list. active represents a selected project

        let userProjectArray = Array.from(document.querySelectorAll(".user-project"));
        userProjectArray[index].classList.add("active");
    }

    function removeActiveInUserProject(index) {
        // This function removes active from the class list. active represents a selected project

        let userProjectArray = Array.from(document.querySelectorAll(".user-project"));
        userProjectArray[index].classList.remove("active");
    }

    function removeActiveForAllUserProject() {
        // This function removes active from all the user project. This helps so that there is only one active every time

        let userProjectArray = Array.from(document.querySelectorAll(".user-project"));

        for (let i = 0; i < userProjectArray.length; i++) {
            userProjectArray[i].classList.remove("active");
        }
    }

    function deleteProjectFromView(index) {
        // This function is used to delete one project from the project pane

        const userTaskContainer = document.querySelector(".user-project-container");
        const userProjectArray = Array.from(document.querySelectorAll(".user-project"));

        for (let i = 0; i < userProjectArray.length; i++) {
            let id = userProjectArray[i].id;

            if (id === index) {
                userTaskContainer.removeChild(userProjectArray[id]);
            }
        }
    }

    function deleteAllProjectsFromView() {
        // This function is used to delete all projects from the project pane. This is used in renderProjects()

        const userProjectContainer = document.querySelector(".user-project-container");
        const userProjectArray = Array.from(document.querySelectorAll(".user-project"));

        for (let i = 0; i < userProjectArray.length; i++) {
            userProjectContainer.removeChild(userProjectArray[i]);
        }
    }

    function createProjectForm() {
        // This function creates the form that allows users to create a new project

        const projectFormPage = document.createElement("div");
        const projectForm = document.createElement("form");
        projectFormPage.classList.add("project-form-page");
        projectFormPage.classList.add("hidden");
        projectForm.name = "ProjectForm";

        let projectNameLabel = document.createElement('label');
        projectNameLabel.setAttribute("for", "name");
        projectNameLabel.innerHTML = "Project Name: ";
        projectForm.append(projectNameLabel);

        let projectNameInput = document.createElement("input");
        projectNameInput.setAttribute("type", "text");
        projectNameInput.setAttribute("name", "name");
        projectNameInput.setAttribute("id", "name");
        projectForm.append(projectNameInput);

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        let submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "button");
        submitBtn.classList.add("project-submit-btn");
        submitBtn.innerHTML = "Submit";

        let cancelBtn = document.createElement("button");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.classList.add("project-cancel-btn");
        cancelBtn.innerHTML = "Cancel";

        buttonContainer.append(submitBtn);
        buttonContainer.append(cancelBtn);
        projectForm.append(buttonContainer);

        projectFormPage.append(projectForm);
        main.append(projectFormPage);
        content.append(main);
    }

    function openForm() {
        // This function makes the Project Form visible

        let formPage = document.querySelector(".project-form-page");
        formPage.classList.remove("hidden");
    }

    function closeForm() {
        // This function hides the Project Form

        let formPage = document.querySelector(".project-form-page");
        formPage.classList.add("hidden");
        clearFormFields();
    }

    function clearFormFields() {
        // This function clears the fields of the Project Form

        document.forms["ProjectForm"].reset();
    }

    function renderProjects() {
        // This function creates the projects on the project view. We use the function deleteAlProjectsFromView so that
        // renderProjects can create them again with an update index

        deleteAllProjectsFromView();

        let storage = window.localStorage;
        let index = 0;

        for (let key in storage) {
            if (storage.hasOwnProperty(key)) {
                let projectName = key;

                const userProject = document.createElement("div");
                userProject.classList.add("user-project");
                userProject.id = index.toString();

                const userProjectText = document.createElement("p");
                userProjectText.classList.add("user-project-text");
                userProjectText.innerHTML = projectName;

                const trash = document.createElement("p");
                trash.classList.add("project-trash-icon");
                trash.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

                const userProjectContainer = document.querySelector(".user-project-container");
                userProject.append(userProjectText);
                userProject.append(trash);
                userProjectContainer.append(userProject);
                projectContainer.append(userProjectContainer);

                index++;
            }
        }
    }


    function render() {
        // This function is used to create DOM content that is static

        createProjectContainerIntro()
        createUserProjectContainer();
        renderProjects();
        createProjectForm();
    }

    return {
        render, renderProjects,
        createUserProject, removeActiveForAllUserProject, deleteProjectFromView,
        removeActiveInUserProject, insertActiveInUserProject,
        openForm, closeForm,
    }
}

export { projectViewFactory }