import { deleteTodoLocal } from "./local-storage-js";
import { storeTodoLocal } from "./local-storage-js";
import { project } from "./project";

const noteFunctions = (state) => ({
  get title() { return state.title; },
  set title(newTitle) { state.title = newTitle; },
  get description() { return state.description; },
  set description(newDescription) { state.description = newDescription; }, 
  get dueDate() { return state.dueDate; },
  set dueDate(newDueDate) { state.dueDate = newDueDate; },
  get priority() { return state.priority},
  set priority(newPriority) { state.priority = newPriority; }, 
  storeNote(projectName) {
    let project = [
      projectName, 
      this.title
    ];
    let data = {
      description: this.description, 
      dueDate: this.dueDate,
      priority: this.priority
    };
    storeTodoLocal(project, data);
  },
})

const deleteFunction = () => ({
  deleteNote(projectName) { 
    let project = [
      projectName,
      this.title
    ];

    deleteTodoLocal(project);
  }
})

const checkBoxFunctions = (state) => ({
  get checked() { return state.checked; },
  checkItem: () => state.checked = true,
  uncheckItem: () => state.checked = false,
  storeNote(projectName) {
    let project = [
      projectName, 
      this.title
    ];
    let data = {
      description: this.description, 
      dueDate: this.dueDate,
      priority: this.priority,
      checked: this.checked
    };
    storeTodoLocal(project, data);
  },
})

export const todoItem = (title) => { 
  let state = { 
    title, 
    description: "",
    dueDate: "",
    priority: "Medium",
  }
  return Object.assign(
    {},
    noteFunctions(state),
    deleteFunction(state)
  )
}

// create factory function with check list item 
export const checkListItem = (title) => { 
  let state = { 
    title, 
    description: "",
    dueDate: "",
    priority: "",
    checked: false
  }
  return Object.assign(
    {},
    noteFunctions(state),
    checkBoxFunctions(state),
    deleteFunction(state),
  )
}