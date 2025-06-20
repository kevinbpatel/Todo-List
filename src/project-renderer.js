import { project } from "./project.js";
import { todoItem } from "./todo-item";


const rerenderTodoItems = (project) => { 
  const todoContainer = document.querySelector("#todo-container");

  todoContainer.replaceChildren();

  project.items.forEach(item => {
    const todoItem = document.createElement("div");
    const todoHeader = document.createElement("div");
    const todoTitle = document.createElement("div");
    

    todoTitle.textContent = item.title;

    todoItem.setAttribute("class", "todo-card");

    todoHeader.appendChild(todoTitle);
    todoHeader.setAttribute("class", "todo-header");
    todoContainer.appendChild(todoHeader);

    const todoDetails = document.createElement("div");
    todoDetails.setAttribute("class", "todo-details")

    const todoDescription = document.createElement("INPUT");
    todoDescription.setAttribute("placeholder", "add description");
    const todoDueDate = document.createElement("INPUT");
    todoDueDate.setAttribute("placeholder", "add Date");
    const priority = document.createElement("INPUT");
    priority.setAttribute("placeholder", "set priority");

    todoDescription.value = item.description;
    todoDueDate.value = item.dueDate;
    priority.value = item.priority;

    todoDetails.appendChild(todoDescription);
    todoDetails.appendChild(todoDueDate);
    todoDetails.appendChild(priority);

    todoDetails.style.display = "none";
    
    todoHeader.addEventListener("click", () => { 

      if (todoDetails.style.display === "block") { 
        todoDetails.style.display = "none";
      } else if (todoDetails.style.display === "none") { 
        todoDetails.style.display = "block";
      }
    });
    
    todoItem.appendChild(todoDetails);

    // in expand: 

      // add description, dueDate, priority 

      // add delete button     


    todoContainer.appendChild(todoItem);
  });
}


export const displayProject = (project) => { 

  // empty the main container 
  const mainContainer = document.querySelector("#main-container");

  mainContainer.replaceChildren();

  const projectTitle = document.createElement("div");
  projectTitle.textContent = project.title;
  projectTitle.setAttribute("id", "project-title");

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
  addTodoInput.setAttribute("placeholder", "add todo item");

  addTodoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && addTodoInput.value !== "") { 
      event.preventDefault();

      project.addItem(todoItem(addTodoInput.value));
      rerenderTodoItems(project);
      addTodoInput.value = "";
    }
  });

  mainContainer.appendChild(addTodoInput);

  // add new todo button
  
}