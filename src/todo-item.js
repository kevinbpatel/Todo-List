import { storeTodoLocal } from "./local-storage-js";

const noteFunctions = (state) => ({
  get title() { return state._title; },
  set title(newTitle) { state._title = newTitle; },
  get description() { return state._description; },
  set description(newDescription) { 
    state._description = newDescription; 
    console.log("hello world");
    storeTodoLocal(state._title, state);
  }, 
  get dueDate() { return state._dueDate; },
  set dueDate(newDueDate) { state._dueDate = newDueDate; },
  get priority() { return state._priority},
  set priority(newPriority) { state._priority = newPriority; }, 
})

const checkBoxFunctions = (state) => ({
  get checked() { return state._checked; },
  checkItem: () => state._checked = true,
  uncheckItem: () => state._checked = false
})

export const todoItem = (_title) => { 
  let state = { 
    _title, 
    _description: "",
    _dueDate: "",
    _priority: "Medium",
  }
  return Object.assign(
    {},
    noteFunctions(state),
  )
}

// create factory function with check list item 
export const checkListItem = (_title) => { 
  let state = { 
    _title, 
    _description: "",
    _dueDate: "",
    _priority: "",
    _checked: false
  }
  return Object.assign(
    {},
    noteFunctions(state),
    checkBoxFunctions(state)
  )
}