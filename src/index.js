import "./styles.css";
import { rerenderProjects } from "./sidebar-renderer.js";
import addImage from "./images/add.svg";
import { projects } from "./globals.js";
import { retrieveData } from "./local-storage.js";
import { project } from "./project.js";

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


retrieveData();
rerenderProjects();
