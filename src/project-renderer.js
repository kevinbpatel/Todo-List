import { editableText, textBox } from "./text-box.js";
import { project } from "./project.js";
import { todoItem } from "./todo-item";


const rerenderTodoItems = (project) => { 
  const todoContainer = document.querySelector("#todo-container");

  todoContainer.replaceChildren();

  project.items.forEach(item => {
    const todoItem = document.createElement("div");
    const todoHeader = document.createElement("div");

    const todoTitle = textBox(item.title, "Project Title");
    todoHeader.appendChild(todoTitle);
    todoTitle.addEventListener("input", () => {
      item.title = todoTitle.value;
    });

    todoItem.setAttribute("class", "todo-card");

    
    todoHeader.setAttribute("class", "todo-header");
    todoContainer.appendChild(todoHeader);

    const todoDetails = document.createElement("div");
    todoDetails.setAttribute("class", "todo-details")

    const todoDescription = textBox(item.description, "add description");
    todoDetails.appendChild(todoDescription);
    todoDescription.addEventListener("input", () => {
      item.description = todoDescription.value;
    });

    // date element 
    const todoDueDate = document.createElement("INPUT");
    todoDueDate.setAttribute("type", "date");
    todoDueDate.value = item.dueDate;
    todoDetails.appendChild(todoDueDate);
    todoDueDate.addEventListener("input", () => {
      item.dueDate = todoDueDate.value;
    });

    const priority = textBox(item.priority, "set priority");
    todoDetails.appendChild(priority);
    priority.addEventListener("input", () => {
      item.priority = priority.value;
    });

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

  const projectTitle = textBox(project.title, "Project Title");
  projectTitle.setAttribute("id", "project-title");
  mainContainer.appendChild(projectTitle);
  projectTitle.addEventListener("input", () => {
      project.title = projectTitle.value;
  });

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