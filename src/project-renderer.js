import { project } from "./project.js";

// everything here should be a function that can be called in index as needed

export const displayProject = (project) => { 

  // empty the main container 
  const mainContainer = document.querySelector("#main-container");

  mainContainer.replaceChildren();

  const projectTitle = document.createElement("div");
  projectTitle.textContent = "test title";

  mainContainer.appendChild(projectTitle);

  // for each item in the project, render each of the items 

  // if its a checkbox, render it differently 


  // add new todo button
}