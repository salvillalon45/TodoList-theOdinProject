const projectViewFactory = function()  {

    const content = document.querySelector("#content");
    const main = document.querySelector("main");

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("projects-container");

    function createProjectContainerIntro() {
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
        console.log("Inside createUserProjectContainer()");

        const userProjectContainer = document.createElement("div");
        userProjectContainer.classList.add("user-project-container");

        projectContainer.append(userProjectContainer);
        main.append(projectContainer);
        content.append(main);
    }

    function createUserProject(projectName) {
        console.log("Inside createUserProject()");

        const userProject = document.createElement("div");
        userProject.classList.add("user-project");

        const userProjectText = document.createElement("p");
        userProjectText.classList.add("user-project-text");
        userProjectText.innerHTML = projectName;

        // userProject.innerHTML = projectName;

        const trash = document.createElement("p");
        trash.classList.add("project-trash-icon");
        trash.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

        const userProjectContainer = document.querySelector(".user-project-container");
        userProject.append(userProjectText);
        userProject.append(trash);
        userProjectContainer.append(userProject);
        projectContainer.append(userProjectContainer);
        main.append(projectContainer);
        content.append(main);
    }

    function insertActiveInUserProject(index) {
        let userProjectArray = Array.from(document.querySelectorAll(".user-project"));
        userProjectArray[index].classList.add("active");
    }

    function removeActiveInUserProject(index) {
        let userProjectArray = Array.from(document.querySelectorAll(".user-project"));
        userProjectArray[index].classList.remove("active");
    }

    function removeActiveForAllUserProject() {
        let userProjectArray = Array.from(document.querySelectorAll(".user-project"));

        for (let i = 0; i < userProjectArray.length; i++) {
            userProjectArray[i].classList.remove("active");
        }
    }

    function renderProjects() {
        console.log("Inside renderProjects()");

        let storage = window.localStorage;
        let index = 0;

        for (let key in storage) {
            if (storage.hasOwnProperty(key)) {

                let projectName = key;
                console.log("What is projectName check in renderProjects:: " + projectName);
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
                main.append(projectContainer);
                content.append(main);

                index++;
            }
        }
    }

    function createProjectForm() {
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
        let formPage = document.querySelector(".project-form-page");
        formPage.classList.remove("hidden");
    }

    function closeForm() {
        let formPage = document.querySelector(".project-form-page");
        formPage.classList.add("hidden");
        clearFormFields();
    }

    function clearFormFields() {
        document.forms["ProjectForm"].reset();
    }

    function deleteProjectFromView(index) {
        console.log("Inside deleteProjectFromView()");

        const userTaskContainer = document.querySelector(".user-project-container");
        const userProjectArray = Array.from(document.querySelectorAll(".user-project"));

        for (let i = 0; i < userProjectArray.length; i++) {
            let id = userProjectArray[i].id;

            if (id === index) {
                console.log("What is id:: " + id);
                console.log("What is index:: " + index);
                userTaskContainer.removeChild(userProjectArray[id]);
            }
        }
    }

    function render() {
        createProjectContainerIntro()
        createUserProjectContainer();
        renderProjects();
        createProjectForm();
    }

    return {
        render, createUserProject, removeActiveInUserProject, insertActiveInUserProject,
        removeActiveForAllUserProject, openForm, closeForm, deleteProjectFromView, renderProjects
    }
}

export { projectViewFactory }