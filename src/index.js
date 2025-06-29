import "./styles.css";
import { todoItem, checkListItem } from "./todo-item.js";
import { project } from "./project.js";
import { displayProject } from "./project-renderer.js";

// instantiate list of projects
const projects = [];

// sample data
projects.push(project("new project"));
projects[0].addItem(todoItem("first item"));
projects[0].addItem(todoItem("second item"));
projects[0].addItem(todoItem("third item"));
projects[0].items[0].description = "default description in index.js";
projects[0].items[0].dueDate = "2002-10-06";


// display all projects
const rerenderProjects = () => { 
  const sidebar = document.querySelector("#sidebar-projects");
  sidebar.replaceChildren();
  projects.forEach(project => {
    const projectLink = document.createElement("a");
    projectLink.textContent = project.title;
    projectLink.setAttribute("class", "project-link");

    projectLink.addEventListener("click", () => { 
      displayProject(project);
    });
    
    sidebar.appendChild(projectLink);
  });
};

// add project button
const addProjectButton = document.createElement("button");
addProjectButton.setAttribute("id", "add-project-button");
sidebar.appendChild(addProjectButton);
const addIcon = document.createElement("img");
addIcon.setAttribute("src", "images/notepad_icon.png");
addProjectButton.appendChild(addIcon);
addProjectButton.addEventListener("click", () => { 
  projects.push(project("Untitled"));
  rerenderProjects();
});

rerenderProjects();
