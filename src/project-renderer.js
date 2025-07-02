import { editableText, textBox } from "./text-box.js";
import { project } from "./project.js";
import { todoItem, checkListItem } from "./todo-item";
import noteImage from "./images/note.svg"
import { projects } from "./globals.js";
import { rerenderProjects } from "./sidebar-renderer.js";


const rerenderTodoItems = (project) => { 
  const todoContainer = document.querySelector("#todo-container");

  todoContainer.replaceChildren();

  project.items.forEach(item => {
    const todoItem = document.createElement("div");
    todoItem.setAttribute("class", "todo-item");

    // todo header container for todo elements
    const todoHeader = document.createElement("div");
    todoHeader.setAttribute("class", "todo-header");
    
    // checkbox logic
    if (item.checked !== undefined) {
      const todoCheckBox= document.createElement("input");
      todoCheckBox.type = "checkbox";
      todoCheckBox.setAttribute("class", "check-box");
      todoCheckBox.checked = item.checked;
      todoHeader.append(todoCheckBox);

      todoCheckBox.addEventListener("change", () => { 
        if (todoCheckBox.checked) { 
          item.checked = true;
        } else { 
          item.checked = false;
        }
        item.storeNote(project.title);
      });

    } else { // otherwise add regular "-"
      const noteIcon = document.createElement("img");
      noteIcon.src = noteImage;
      todoHeader.appendChild(noteIcon);
    }

    // todo title to be put in header
    const todoTitle = textBox(item.title, "Project Title");
    todoTitle.setAttribute("id", "todo-title");
    todoHeader.appendChild(todoTitle);
    todoTitle.addEventListener("input", () => {
      item.deleteNote(project.title);
      item.title = todoTitle.value;
      item.storeNote(project.title);
    });
    todoHeader.setAttribute("class", "todo-header");
    todoItem.appendChild(todoHeader);

    // todo details dropdown container
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
      item.storeNote(project.title);
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
      item.storeNote(project.title);
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
      item.storeNote(project.title);
    });

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "todo-delete");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => { 
      project.removeItem(item);
      rerenderTodoItems(project);
    });

    todoDetails.appendChild(deleteButton);

    
    
    // logic to bring up todo details by clicking header
    todoDetails.style.display = "none";
    todoHeader.addEventListener("click", () => { 
      if (todoDetails.style.display === "flex") { 
        todoDetails.style.display = "none";
      } else if (todoDetails.style.display === "none") { 
        todoDetails.style.display = "flex";
      }
    });
    
    todoItem.appendChild(todoDetails);
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
    // if project title edited, delete all its todo's from storage (under the
    // old name) and add all the todo's back under the new name
    project.items.forEach(item => {
      item.deleteNote(project.title);
    });
    project.title = projectTitle.value;
    project.items.forEach(item => { 
      item.storeNote(project.title);
    });
    rerenderProjects();
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
      let newTodoItem;
      if (addTodoInput.value.startsWith("[]")) { // extract input
        newTitle = addTodoInput.value.split("[]")[1];
        newTodoItem = checkListItem(newTitle);
      } else { 
        newTodoItem = todoItem(addTodoInput.value);        
      }

      project.addItem(newTodoItem);
      newTodoItem.storeNote(project.title);
      
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