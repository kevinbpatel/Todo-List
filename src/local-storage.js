import { projects } from "./globals.js";
import { project } from "./project.js";
import { todoItem, checkListItem } from "./todo-item.js";

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export const storeTodoLocal = (key, value) => { 
  localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

export const deleteTodoLocal = (key) => { 
  localStorage.removeItem(JSON.stringify(key));
}

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

