const board = document.getElementById("tabuleiro");
const cells = board.getElementsByTagName("td");
const lines =  board.getElementsByTagName("tr").length;
const cols = cells.length / lines;
//const shipSize = 3;
const shipSizes = [5, 3, 3, 2, 1];
const shipLocations = createShip();
let hitTarget = 0;

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', cellClick)
}

function generateRandom(max) {
  random = Math.floor(Math.random() * max);

  return random;
}

function createShip() {
  ships = [];

  for (i = 0; i < shipSizes.length; i++) {
    let shipSize = shipSizes[i];
    let ship = [];
    let overlap = false;

    do {
      overlap = false;
      let line = generateRandom(lines);
      let col = generateRandom(cols - shipSize);
      
      for (j = 0; j < shipSize; j++) {
        ship[j] = [line, col + j];
      }
      
      for (let k = 0; k < ships.length; k++) {
        if (checkCollision(ship, ships[k])) {
          overlap = true;
          break;
        }
      }
      
    } while (overlap);

    ships[i] = ship;
  }

  return ships;
}

function checkCollision(ship1, ship2) {
  for (let i = 0; i < ship1.length; i++) {
    for (let j = 0; j < ship2.length; j++) {
      if (ship1[i][0] === ship2[j][0] && ship1[i][1] === ship2[j][1]) {
        return true;
      }
    }
  }
  return false;
}

function cellClick() {
  const row = this.parentNode.rowIndex;
  const col = this.cellIndex;

  if (checkForHit(row, col)) {
    this.style.backgroundColor = '#FF0000' /*cor da tiro*/
    checkForWin();
  } else {
    this.style.backgroundColor = '#1E90FF	' /*cor da agua*/
  }
  this.removeEventListener('click', cellClick);
}

function checkForHit(row, col) {
  for (let i = 0; i < shipLocations.length; i++) {

    for (let j = 0; j < shipLocations[i].length; j++) {
      if (shipLocations[i][j][0] === row && shipLocations[i][j][1] === col) {
        hitTarget++;
        shipLocations[i].splice(j, 1);

        if (!shipLocations[i].length) {
          shipLocations.splice(i, 1);
        }
        return true;
      }
    }
  }

  return false;
}

function checkForWin() {
  if (shipLocations.length === 0) {
    alert("Parabéns!!! Você ganhou");
    location.reload();
  }
}