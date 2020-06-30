const projectViewFactory = function()  {

    const content = document.querySelector("#content");
    const main = document.createElement("main");

    const projects = document.createElement("div");
    projects.classList.add("projects-container");
    projects.innerHTML = "<h2>Projects</h2>";

    function createInputProjectContainer() {
        console.log("Inside createInputProjectContainer()");

        const inputProjectsContainer = document.createElement("div");
        inputProjectsContainer.classList.add("input-project-container");

        inputProjectsContainer.innerHTML = '<label for="input-project"></label>' + '<input id="input-project" placeholder="New project...">';

        projects.append(inputProjectsContainer);
        main.append(projects);
        content.append(main);
    }

    function createUserProjectContainer() {
        console.log("Inside createUserProjectContainer()");

        const userProjectContainer = document.createElement("div");
        userProjectContainer.classList.add("user-project-container");

        projects.append(userProjectContainer);
        main.append(projects);
        content.append(main);
    }

    function createUserProject(projectTitle) {
        console.log("Inside createUserProject()");

        const userProject = document.createElement("p");
        userProject.classList.add("user-project");

        userProject.innerHTML = projectTitle;

        const userProjectContainer = document.querySelector(".user-project-container");
        userProjectContainer.append(userProject);
        projects.append(userProjectContainer);
        main.append(projects);
        content.append(main);
    }

    function render() {
        createInputProjectContainer();
        createUserProjectContainer();
    }

    return {
        render, createUserProject
    }
}

export { projectViewFactory }