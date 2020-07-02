const projectViewFactory = function()  {

    const content = document.querySelector("#content");
    const main = document.querySelector("main");

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("projects-container");
    projectContainer.innerHTML = "<h2>Projects</h2>";

    function createInputProjectContainer() {
        console.log("Inside createInputProjectContainer()");

        const inputProjectsContainer = document.createElement("div");
        inputProjectsContainer.classList.add("input-project-container");

        inputProjectsContainer.innerHTML = '<label for="input-project"></label>' + '<input id="input-project" placeholder="New project...">';

        projectContainer.append(inputProjectsContainer);
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
        // const userProject = document.querySelector(".user-project");
        let userProjectArray = Array.from(document.querySelectorAll(".user-project"));
        // userProjectArray[index].classList.add("active");
        userProjectArray[index].classList.toggle("active");
        // userProject.classList.add("active");
    }

    function removeActiveInUserProject(index) {
        // const userProject = document.querySelector(".user-project");
        //
        // userProject.classList.remove("active");
        let userProjectArray = Array.from(document.querySelectorAll(".user-project"));
        userProjectArray[index].classList.toggle("active");
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

                console.log(`${key} : ${storage[key]}`);
            }
        }
    }

    function render() {
        createInputProjectContainer();
        createUserProjectContainer();
        renderAllUserProjects();
    }

    return {
        render, createUserProject, removeActiveInUserProject, insertActiveInUserProject
    }
}

export { projectViewFactory }