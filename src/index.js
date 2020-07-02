import { projectControllerFactory } from "./controllers/projectController";
import { projectViewFactory } from "./pages/projectView";
import { taskViewFactory} from "./pages/taskView";

console.log("Inside index.js");

let projectController = projectControllerFactory();
let projectView = projectViewFactory();
let taskView = taskViewFactory();

let project1Task1 = {
    taskName: "Create A New Project",
    Description: "To create a new Project, type its name in the field in the left pane, then press Enter button.",
    Due:"2020-06-29",
    Priority: "high"
}

let project1Task2 = {
    taskName: "Take out trash",
    Description: "Take out trash every sunday",
    Due:"2020-06-29",
    Priority: "high"
}

let project1 = {
    name: "project1",
    tasks: [project1Task1, project1Task2]
}

let project2Task1 = {
    taskName: "Create A New Project in project 2",
    Description: "To create a new Project, type its name in the field in the left pane, then press Enter button.",
    Due:"2020-06-29",
    Priority: "high"
}

let project2Task2 = {
    taskName: "Take out trash in project 2",
    Description: "Take out trash every sunday",
    Due:"2020-06-29",
    Priority: "high"
}

let project2 = {
    name: "Project 2",
    tasks: [project2Task1, project2Task2]
}

window.localStorage.setItem(project1.name, JSON.stringify(project1));
window.localStorage.setItem(project2.name, JSON.stringify(project2));

projectView.render();
taskView.render();
// document.getElementById("input-project").addEventListener("change", function(event) {
//     let projectTitle = document.getElementById("input-project").value;
//     console.log(projectTitle);
//     projectController.createProject(projectTitle);
//     projectView.createUserProject(projectTitle);
//     document.getElementById("input-project").value = "";
// });


function createEventListeners() {
    console.log("inside createEventListeners");

    let userProjectArray = Array.from(document.querySelectorAll(".user-project"));

    for (let i = 0; i < userProjectArray.length; i++) {
        let userProject = userProjectArray[i];

        userProject.addEventListener("click", function () {
            let projectName = this.innerHTML;
            // let classArray = this.className.split(" ");
            console.log(userProject.classList.contains("active"));

            // if (classArray.indexOf("active") < 0) {
            if (userProject.classList.contains("active") === false) {
                // active is not in class
                console.log("active is not in class");

                // that.innerHTML = currentMarker;
                // that.classList.add("taken");
                // updateMarker(that.id);
                taskView.renderTasksForProjectView(projectName);
                projectView.insertActiveInUserProject(i);
            }
            // else {
            //     console.log("active is in class");
            //     taskView.removeTasksForProjectView();
            //     projectView.removeActiveInUserProject(i);
            // }

        });
    }
}

createEventListeners();

