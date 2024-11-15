function buildField() {
  const para = document.createElement("p");
  const node = document.createTextNode("Test Para");

  para.appendChild(node);
  document.getElementById("main").appendChild(para);
}
