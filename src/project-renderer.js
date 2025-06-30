import { editableText, textBox } from "./text-box.js";
import { project } from "./project.js";
import { todoItem, checkListItem } from "./todo-item";
import noteImage from "./images/note.svg"


const rerenderTodoItems = (project) => { 
  const todoContainer = document.querySelector("#todo-container");

  todoContainer.replaceChildren();

  project.items.forEach(item => {
    const todoItem = document.createElement("div");
    todoItem.setAttribute("class", "todo-item");

    // todo header container for todo elements
    const todoHeader = document.createElement("div");
    todoHeader.setAttribute("class", "todo-header");
    
    
  
    // if item is a checkBox
    if (item.checked !== undefined) { // add checkbox input element
      const todoCheckBox= document.createElement("input");
      todoCheckBox.type = "checkbox";
      todoHeader.append(todoCheckBox);
    } else { // otherwise add regular "-"
      const noteIcon = document.createElement("img");
      noteIcon.src = noteImage;
      todoHeader.appendChild(noteIcon);
    }

    // todo title to be put in header
    const todoTitle = textBox(item.title, "Project Title");
    todoHeader.appendChild(todoTitle);
    todoTitle.addEventListener("input", () => {
      item.title = todoTitle.value;
    });

    
    

    
    todoHeader.setAttribute("class", "todo-header");
    todoItem.appendChild(todoHeader);

    const todoDetails = document.createElement("div");
    todoDetails.setAttribute("class", "todo-details");

    // description element
    const descriptionLabel = document.createElement("LABEL");
    descriptionLabel.setAttribute("for", "description-text");
    descriptionLabel.textContent = "Description:";
    todoDetails.appendChild(descriptionLabel);
    const todoDescription = textBox(item.description, "add description");
    todoDescription.setAttribute("id", "description-text");
    todoDetails.appendChild(todoDescription);
    todoDescription.addEventListener("input", () => {
      item.description = todoDescription.value;
    });

    // date element 
    const dateLabel = document.createElement("LABEL");
    dateLabel.setAttribute("for", "date-select");
    dateLabel.textContent = "Date:";
    todoDetails.appendChild(dateLabel);
    const todoDueDate = document.createElement("INPUT");
    todoDueDate.setAttribute("id", "date-select");
    todoDueDate.setAttribute("type", "date");
    todoDueDate.value = item.dueDate;
    todoDetails.appendChild(todoDueDate);
    todoDueDate.addEventListener("input", () => {
      item.dueDate = todoDueDate.value;
    });

    // priority element 
    const priorityLabel = document.createElement("LABEL");
    priorityLabel.setAttribute("for", "priority-select");
    priorityLabel.textContent = "Priority:";
    todoDetails.appendChild(priorityLabel);
    const priority = document.createElement("SELECT");
    priority.setAttribute("id", "priority-select");
    const optionLow = document.createElement("OPTION");
    optionLow.textContent = "Low";
    const optionMedium = document.createElement("OPTION");
    optionMedium.textContent = "Medium";
    const optionHigh = document.createElement("OPTION");
    optionHigh.textContent = "High";
    priority.appendChild(optionLow);
    priority.appendChild(optionMedium);
    priority.appendChild(optionHigh);
    priority.value = item.priority;
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

  const addTodoContainer = document.createElement("div");
  addTodoContainer.setAttribute("class", "add-todo-container")
  const addTodoInput = document.createElement("INPUT");
  addTodoInput.setAttribute("type", "text");
  addTodoInput.setAttribute("class", "add-todo-input");
  addTodoInput.setAttribute("placeholder", "add todo item");
  

  addTodoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && addTodoInput.value !== "") { 
      event.preventDefault();

      // if person creates a checkbox 

      let newTitle = "";
      if (addTodoInput.value.startsWith("[]")) { 
        newTitle = addTodoInput.value.split("[]")[1];

        project.addItem(checkListItem(newTitle));

      } else { 
        project.addItem(todoItem(addTodoInput.value));
      }

      
      rerenderTodoItems(project);
      addTodoInput.value = "";
    }
  });

  const noteIcon = document.createElement("img");
  noteIcon.src = noteImage;
  addTodoContainer.appendChild(noteIcon);
  addTodoContainer.appendChild(addTodoInput);
  mainContainer.appendChild(addTodoContainer);

  // add new todo button
  
}