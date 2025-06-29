

export const textBox = (element, placeholder) => { 

  const textBox = document.createElement("INPUT");
  textBox.setAttribute("placeholder", placeholder);
  textBox.setAttribute("class", "editable-textbox");

  // get the existing text in the element and display it 
  textBox.value = element;

  return textBox;
}