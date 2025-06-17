import "./styles.css";
import { todoItem, checkListItem } from "./todo-item.js";
import { project } from "./project.js";


// instantiate list of projects
const projects = [];

projects.push(project("new project"));
projects[0].addItem(todoItem("first item"));
projects[0].addItem(todoItem("second item"));
projects[0].addItem(todoItem("third item"));

projects[0].items.forEach(item => {
  console.log(item.title);
});
