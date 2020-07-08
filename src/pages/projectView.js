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

    // function createInputProjectContainer() {
    //     console.log("Inside createInputProjectContainer()");
    //
    //     const inputProjectsContainer = document.createElement("div");
    //     inputProjectsContainer.classList.add("input-project-container");
    //
    //     inputProjectsContainer.innerHTML = '<label for="input-project"></label>' + '<input id="input-project" placeholder="New project...">';
    //
    //     projectContainer.append(inputProjectsContainer);
    //     main.append(projectContainer);
    //     content.append(main);
    // }

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

        const userProject = document.createElement("p");
        userProject.classList.add("user-project");

        userProject.innerHTML = projectName;

        const userProjectContainer = document.querySelector(".user-project-container");
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

    function renderAllUserProjects() {
        console.log("Inside renderAllUserProjects()");

        let storage = window.localStorage;

        for (let key in storage) {
            if (storage.hasOwnProperty(key)) {
                let projectTitle = key;
                let projectInfo = storage[key];

                const userProject = document.createElement("p");
                userProject.classList.add("user-project");
                userProject.innerHTML = projectTitle;

                const userProjectContainer = document.querySelector(".user-project-container");
                userProjectContainer.append(userProject);
                projectContainer.append(userProjectContainer);
                main.append(projectContainer);
                content.append(main);

                // console.log(`${key} : ${storage[key]}`);
            }
        }
    }

    function render() {
        createProjectContainerIntro()
        // createInputProjectContainer();
        createUserProjectContainer();
        renderAllUserProjects();
    }

    return {
        render, createUserProject, removeActiveInUserProject, insertActiveInUserProject, removeActiveForAllUserProject
    }
}

export { projectViewFactory }