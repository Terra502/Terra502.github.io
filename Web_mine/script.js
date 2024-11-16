const max_x = 10;
const max_y = 10;
const bombs = 20;
var fieldscleared = 0;
var boolArray = [max_x][max_y];
var boolArray = Array.from({ length: max_x }, () => Array(max_y).fill(false));
var intArray = Array.from({ length: max_x}, () => Array(max_y).fill(0));

function buildField() {
  const body = document.body,
    tbl = document.createElement('table');
  tbl.style.width = '100px';
  tbl.style.border = '1px solid black';

  for (let i = 0; i < max_y; i++){
    const tr = tbl.insertRow();
    for (let j = 0; j < max_x; j++){
      const td = tr.insertCell();
      const button = document.createElement('button');
      button.style.width = "50px";
      button.style.height = "50px";
      button.setAttribute("id",i +";" + j);
      button.onclick = function() {
        clickedButton(this.id);
      };
      td.appendChild(button);
    }
  }
  body.appendChild(tbl);
  setField();
}

function setField(){
  var plantedBombs = 0;
  while (plantedBombs < bombs) {
    const temp_x = getRandomInt(10);
    const temp_y = getRandomInt(10);
    if (boolArray[temp_x][temp_y] == false) {
      boolArray[temp_x][temp_y] = true;
      plantedBombs++;
    }
  }
  calcIntArray();
}

function calcIntArray(){
  for (let i = 0; i < max_y; i++){
    for (let j = 0; j < max_x; j++){
      if (boolArray[i][j]) {
        incrementNeighbors(i, j);
      }
    }
  }
}

function incrementNeighbors(x, y) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1], // oben links, oben, oben rechts
    [0, -1],          [0, 1],   // links, rechts
    [1, -1], [1, 0], [1, 1]     // unten links, unten, unten rechts
  ];
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < max_y && ny >= 0 && ny < max_x) {
      intArray[nx][ny]++;
    }
  }
}

function clickedButton(id) {
  const temp_array = id.split(";");
  const temp_x = parseInt(temp_array[0]);
  const temp_y = parseInt(temp_array[1]);
  const button = document.getElementById(id);

  if (!boolArray[temp_x][temp_y]) {
    button.style.background = '#ffffff';
    fieldscleared++;
    button.textContent = intArray[temp_x][temp_y];

    if (intArray[temp_x][temp_y] === 0) {
      // Start rekursives Aufdecken
      revealEmptyFields(temp_x, temp_y, new Set());
    }
    checkForWin();
  } else {
    alert("Spiel verloren!");
    location.reload();
  }
}

function revealEmptyFields(x, y, visited) {
  const id = `${x};${y}`;
  if (visited.has(id)) return; // Abbruchkriterium
  visited.add(id);

  const directions = [
    [-1, -1], [-1, 0], [-1, 1], // oben links, oben, oben rechts
    [0, -1],          [0, 1],   // links, rechts
    [1, -1], [1, 0], [1, 1]     // unten links, unten, unten rechts
  ];
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < max_y && ny >= 0 && ny < max_x) {
      const neighborId = `${nx};${ny}`;
      const button = document.getElementById(neighborId);

      if (!boolArray[nx][ny] && !visited.has(neighborId)) {
        button.style.background = '#ffffff';
        fieldscleared++;
        button.textContent = intArray[nx][ny];

        // Rekursiv nur für leere Felder
        if (intArray[nx][ny] === 0) {
          revealEmptyFields(nx, ny, visited);
        }
      }
    }
  }
}

function checkForWin() {
  if (fieldscleared >= (max_x * max_y - bombs)) {
    alert("Gewonnen!");
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 10);
}

function auswertung(x, y){
  var button = document.getElementById(x + ";" + y)
  if (!button.textContent) {
    aufdeckenObenRechts(x,y);
  }
  button.style.background = '#ffffff';
  button.textContent = intArray[x][y];
  fieldscleared++;
}

function aufdeckenObenRechts(x, y)
{
  var ax = x;
  var ay = y;
  try {
    if (boolArray[x+1][y-1] == false) {
      auswertung(ax+1,ay-1);
    }
  } catch(error) {      
  } finally {
    aufdeckenOben(ax,ay);
  } // end of try
} 

function aufdeckenOben(x, y)
{
  var ax = x;
  var ay = y;
  try {
    if (boolArray[x][y-1] == false) {
      auswertung(ax,ay-1);
    }
  } catch(error) {      
  } finally {
    aufdeckenObenLinks(ax,ay);
  } // end of try
}

function aufdeckenObenLinks(x, y)
{
  var ax = x;
  var ay = y;
  try {
    if (boolArray[x-1][y-1] == false) {
      auswertung(ax-1,ay-1);
    }
  } catch(error) {      
  } finally {
    aufdeckenLinks(ax,ay);
  } // end of try
}

function aufdeckenLinks(x, y)
{
  var ax = x;
  var ay = y;
  try {
    if (boolArray[x-1][y] == false) {
      auswertung(ax-1,ay);
    }
  } catch(error) {      
  } finally {
    aufdeckenRechts(ax,ay);
  } // end of try
}

function aufdeckenRechts(x, y)
{
  var ax = x;
  var ay = y;
  try {
    if (boolArray[x+1][y] == false) {
      auswertung(ax+1,ay);
    }
  } catch(error) {      
  } finally {
    aufdeckenUntenLinks(ax,ay);
  } // end of try
}

function aufdeckenUntenRechts(x, y)
{
  var ax = x;
  var ay = y;
  try {
    if (boolArray[x+1][y+1] == false) {
      auswertung(ax+1,ay+1);
    }
  } catch(error) {
  } 
}

function aufdeckenUnten(x, y)
{
  var ax = x;
  var ay = y;
  try {
    if (boolArray[x][y+1] == false) {
      auswertung(ax,ay+1);
    }
  } catch(error) {      
  } finally {
    aufdeckenUntenRechts(ax,ay);
  } // end of try
}

function aufdeckenUntenLinks(x, y)
{
  var ax = x;
  var ay = y;
  try {
    if (boolArray[x-1][y+1] == false) {
      auswertung(ax-1,ay+1);
    }
  } catch(error) {      
  } finally {
    aufdeckenUnten(ax,ay);
  } // end of try
}