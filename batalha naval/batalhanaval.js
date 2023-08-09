const board = document.getElementById("tabuleiro");
const cells = board.getElementsByTagName("td");
const lines =  board.getElementsByTagName("tr").length;
const cols = cells.length / lines;
//const shipSize = 3;
const shipSizes = [5, 3, 3, 2, 1];
const shipLocations = createShip();
let hitTarget = 0;

for (let i = 0; i < cells.length; i++) {
  const row = cells[i].parentNode.rowIndex;
  const col = cells[i].cellIndex;

  if (row === 0 || col === 0) {
    cells[i].style.pointerEvents = "none";
  } else {
    cells[i].addEventListener('click', cellClick);
  }
}

function generateRandom(max) {
  return Math.floor(Math.random() * max);
}

function createShip() {
  const ships = [];

  for (i = 0; i < shipSizes.length; i++) {
    let shipSize = shipSizes[i];
    let ship = [];
    let overlap = false;

    do {
      overlap = false;
      let orientation = generateRandom(2); // 0 for horizontal, 1 for vertical
      let line, col;
      
      if (orientation === 0) { // Horizontal ship
        line = generateRandom(lines - 1) + 1;
        col = generateRandom(cols - shipSize) + 1;
      } else { // Vertical ship
        line = generateRandom(lines - shipSize) + 1;
        col = generateRandom(cols - 1) + 1;
      }
      
      for (j = 0; j < shipSize; j++) {
        if (orientation === 0) { // Horizontal ship
          ship[j] = [line, col + j];
        } else { // Vertical ship
          ship[j] = [line + j, col];
        }
      }
      
      // Check if the ship overlaps with any other ship or is within the radius of 1 block from other ships
      if (checkWithinRadius(ship, ships)) {
        overlap = true;
      }
      
    } while (overlap);

    ships.push(ship);
  }

  return ships;
}

function checkWithinRadius(newShip, existingShips) {
  // Check for every ship in the existingShips array
  for (const existingShip of existingShips) {
    // Check every coordinate of the new ship
    for (const [row, col] of newShip) {
      // Check every coordinate of the existing ship
      for (const [eRow, eCol] of existingShip) {
        // Calculate the distance between the coordinates
        const distance = Math.abs(row - eRow) + Math.abs(col - eCol);
        if (distance <= 1) {
          return true; // Overlaps or within 1 block distance
        }
      }
    }
  }
  return false; // No overlap or within 1 block distance
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

let lastClickedCell = null;

function cellClick() {
  const row = this.parentNode.rowIndex;
  const col = this.cellIndex;
  
  if (lastClickedCell) {
    lastClickedCell.style.border = 'none'; /* Remove border from the previously clicked cell */
  }

  if (checkForHit(row, col)) {
    this.style.backgroundColor = 'red' /*cor da tiro*/
    this.style.border = '1px solid #1E90FF'; /*borda azul*/
    checkForWin();
  } else {
    this.style.backgroundColor = '#1E90FF	' /*cor da agua*/
    this.style.border = '1px solid #1E90FF '; /*borda azul*/
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
