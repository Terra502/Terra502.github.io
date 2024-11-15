function buildField() {
  const x = 10;
  const y = 10;
  const body = document.body,
        tbl = document.createElement('table');
  tbl.style.width = '100px';
  tbl.style.border = '1px solid black';
  //const para = document.createElement("p");
  //const node = document.createTextNode("Test Para");
  //para.appendChild(node);
  //document.getElementById("main").appendChild(para);

  for (let i = 0; i < y; i++){
    const tr = tbl.insertRow();
    for (let j = 0; j < x; j++){
      const td = tr.insertCell();
      td.appendChild(document.createElement('button'));
    }
  }
  body.appendChild(tbl);
}
