import { deleteTodoLocal } from "./local-storage";

const projectFunctions = (state) => ({
  get title() { return state.title; },
  set title(newTitle) { state.title = newTitle; },
  get items() { return state.items; },
  addItem: (item) => state.items.push(item),
  removeItem(item) {
    state.items.splice(this.items.indexOf(item), 1);
    let keyData = [
      this.title, 
      item.title
    ];

    deleteTodoLocal(keyData);
  }
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