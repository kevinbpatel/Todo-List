const noteFunctions = (state) => ({
  get title() { return state.title; },
  set title(newTitle) { state.title = newTitle; },
  get description() { return state.description; },
  set description(newDescription) { state.description = newDescription; }, 
  get dueDate() { return state.dueDate; },
  set dueDate(newDueDate) { state.dueDate = newDueDate; },
  get priority() { return state.priority},
  set priority(newPriority) { state.priority = newPriority; }, 
})

const checkBoxFunctions = (state) => ({
  get checked() { return state.checked; },
  checkItem: () => state.checked = true,
  uncheckItem: () => state.checked = false
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
    checkBoxFunctions(state)
  )
}