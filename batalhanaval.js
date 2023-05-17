console.log("Funcionando");

const board = document.getElementById("tabuleiro");
const cells = board.getElementsByTagName("td");
const lines =  board.getElementsByTagName("tr").length;
const cols = cells.length / lines;
const shipSize = 3;
const shipLocations = createShip();
let hitTarget = 0;

for (let i=0; i < cells.length ; i++) {
  cells[i].addEventListener('click',cellClick)
  console.log(i);
}

function generateRandom(max) {
  random = Math.floor(Math.random()*max);

  console.log(max);
  return random;
}

function createShip() {

  let line = generateRandom(lines);
  let col = generateRandom(cols - shipSize);
  ship = [];

  for (i = 0; i < shipSize; i++) {
    ship[i] = [line, col+i]
  }

  console.log(ship);
  return ship;
}

function cellClick() {
  const row = this.parentNode.rowIndex;
  const col = this.cellIndex;
  console.log(row + " x " + col);

  if (checkForHit(row, col) == true) {
    this.style.backgroundColor = '#b6ff7f'
    checkForWin();
  }else{
    this.style.backgroundColor = '#716ddb'
  }
  this.removeEventListener('click',cellClick);
}

function checkForHit(row,col) {
  for(let i=0; i<shipLocations.length; i++) {
    console.log(shipLocations[i]);
    if (shipLocations[i][0] == row && shipLocations[i][1] == col ) {
      hitTarget++;
      shipLocations.splice(i,1);
      return true;
    }
  }

  return false;
}

function checkForWin() {
  if(shipLocations.length == 0) {
    alert("Paranbéns!!! Você ganhou");
  }
}