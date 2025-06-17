const projectFunctions = (state) => ({
  get title() { return state.title; },
  set title(newTitle) { state.title = newTitle; },
  get items() { return state.items; },
  addItem: (item) => state.items.push(item),
  removeItem: (item) => state.items.splice(indexOf(item), 1),
})

export const project = (title) => { 
  let state = { 
    title,
    items: [],
  }
  return Object.assign ( 
    {},
    projectFunctions(state),
  )
}