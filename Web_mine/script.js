function buildField() {
  const x = 10;
  const y = 10;
  const body = document.body,
    tbl = document.createElement('table');
  tbl.style.width = '100px';
  tbl.style.border = '1px solid black';

  for (let i = 0; i < y; i++){
    const tr = tbl.insertRow();
    for (let j = 0; j < x; j++){
      const td = tr.insertCell();
      const button = document.createElement('button');
      button.style.width = "50px";
      button.style.height = "50px";
      button.setAttribute("id",i +";" + j);
      button.onclick = logButton(doWithThisElement(this.id));
      td.appendChild(button);
    }
  }
  body.appendChild(tbl);
}

function logButton(id){
  console.log(id);
}
