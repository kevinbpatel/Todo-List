import "./styles.css";
import { todoItem, checkListItem } from "./todo-item.js";
import { project } from "./project.js";
import { displayProject } from "./project-renderer.js";
import addImage from "./images/add.svg"
import { storageAvailable } from "./local-storage-js";

// instantiate list of projects
const projects = [];

// sample data
// projects.push(project("new project"));
// projects[0].addItem(todoItem("first item"));
// projects[0].addItem(todoItem("second item"));
// projects[0].addItem(todoItem("third item"));
// projects[0].items[0].description = "default description in index.js";
// projects[0].items[0].dueDate = "2002-10-06";
 
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
addIcon.src = addImage;
addIcon.setAttribute("id", "add-icon")
addProjectButton.appendChild(addIcon);
addProjectButton.addEventListener("click", () => { 
  projects.push(project("Untitled"));
  rerenderProjects();
});

export const retrieveData = () => { 
  const localStorageItems = { ...localStorage };

  Object.keys(localStorageItems).forEach(item => {
    let projectName, todoItemName;
    [projectName, todoItemName] = JSON.parse(item);
    
    let projectNames = [];
    projects.forEach(project => {
      projectNames.push(project.title);
    });

    let newProject;
    // iterate through projects and get the project with projectName
    for (let i = 0; i < projects.length; i++) { 
      if (projects[i].title === projectName) { 
        newProject = projects[i];
      }
    }
    
    if (newProject === undefined) {
      newProject = project(projectName);
      projects.push(newProject);
    }

    let newTodoItem;
    let todoItemDetails = JSON.parse(localStorageItems[item])

    if (todoItemDetails.checked !== undefined) { 
      newTodoItem = checkListItem(todoItemName);
      newTodoItem.description = todoItemDetails.description;
      newTodoItem.dueDate = todoItemDetails.dueDate;
      newTodoItem.priority = todoItemDetails.priority;
      newTodoItem.checked = todoItemDetails.checked;
    } else { 
      newTodoItem = todoItem(todoItemName);
      newTodoItem.description = todoItemDetails.description;
      newTodoItem.dueDate = todoItemDetails.dueDate;
      newTodoItem.priority = todoItemDetails.priority;
    }

    newProject.addItem(newTodoItem);
  });
}

retrieveData();
rerenderProjects();
