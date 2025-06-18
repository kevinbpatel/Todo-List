import { project } from "./project.js";
import { todoItem } from "./todo-item";


const rerenderTodoItems = (project) => { 
  const todoContainer = document.querySelector("#todo-container");

  todoContainer.replaceChildren();

  project.items.forEach(item => {
    const todoItem = document.createElement("div");
    
    const todoTitle = document.createElement("div");
    const todoDescription = document.createElement("div");

    todoTitle.textContent = item.title;
    todoDescription.textContent = item.description;

    todoItem.appendChild(todoTitle);
    todoItem.appendChild(todoDescription);

    todoContainer.appendChild(todoItem);
  });
}


export const displayProject = (project) => { 

  // empty the main container 
  const mainContainer = document.querySelector("#main-container");

  mainContainer.replaceChildren();

  const projectTitle = document.createElement("div");
  projectTitle.textContent = project.title;

  mainContainer.appendChild(projectTitle);

  const todoContainer = document.createElement("div");
  todoContainer.setAttribute("id", "todo-container");
  todoContainer.style.display = "flex";
  todoContainer.style.flexDirection = "column";
  mainContainer.appendChild(todoContainer);

  // for each item in the project, render each of the items 
  rerenderTodoItems(project);

  const addTodoInput = document.createElement("INPUT");
  addTodoInput.setAttribute("type", "text");

  addTodoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { 
      event.preventDefault();

      project.addItem(todoItem(addTodoInput.value));
      rerenderTodoItems(project);
    }
  });

  mainContainer.appendChild(addTodoInput);

  // add new todo button
  
}