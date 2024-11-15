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
      td.style.width = "200px";
      td.style.height = "200px";
      td.appendChild(button);
    }
  }
  body.appendChild(tbl);
}
