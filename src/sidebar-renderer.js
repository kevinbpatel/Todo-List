import { displayProject } from "./project-renderer.js";
import { projects } from "./globals.js"

export const rerenderProjects = () => { 
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
