const gridContainer = document.querySelector('#grid-container');
const resetGridBtn = document.querySelector('#reset-grid');
const changeSizeBtn = document.querySelector('#change-size');

document.addEventListener('dragstart', (event) => {
  event.preventDefault();
});

let squaresPerSide = 24;
buildGrid(squaresPerSide);

resetGridBtn.onclick = resetGrid;

changeSizeBtn.onclick = function() {
  changeSquaresPerSide();
  // Remove grid to create with new squaresPerSide
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  buildGrid(squaresPerSide);
  isMouseDown = false;
};

function buildGrid(squaresPerSide) {
   for (let i = 0; i < squaresPerSide; i++) {
    const rows = document.createElement('div');
    rows.classList.add('rows');
    gridContainer.appendChild(rows);

    for (let j = 0; j < squaresPerSide; j++) {
      const columns = document.createElement('div');
      columns.classList.add('columns');
      rows.appendChild(columns);
    };
   };
   // Register event listeners to all squares to paint them black   when hovered
    let cells = document.querySelectorAll('.columns');
    cells.forEach(cell => {
      cell.addEventListener('mousedown', handleDown);
      cell.addEventListener('mouseover', handleHover);
      cell.addEventListener('mouseup', handleUp);
    });
}

document.querySelector('body').addEventListener('mouseup', handleUp);

// Painting while clicking and hovering logic
let isMouseDown = false;

function handleDown(event) {
  isMouseDown = true;
  paintCell(event.target);
}

function handleUp(event) {
  isMouseDown = false;
}

function handleHover(event) {
  if (isMouseDown) {
    paintCell(event.target);
  }
}

function paintCell(cell) {
  if (cell.classList.contains('columns')) {
    if (isEraser) {
      cell.style.backgroundColor = 'white';
    }
    else if (isRgb) {
      let colors = {}
      // Pick random numbers for rgb
      colors.red = Math.floor(Math.random() * 256);
      colors.green = Math.floor(Math.random() * 256);
      colors.blue = Math.floor(Math.random() * 256);
      
      // Make one random value 0, one random value 255 in order to make the color more bright and saturated
      // Pick a random color to make 0 
      let mainRGB = ["red", "green", "blue"];

      // Get a random number(0, 1, 2) so it can work with index directly
      let zeroColorIndex = Math.floor(Math.random() * 3);

      let zeroColor = mainRGB[zeroColorIndex];
      colors[zeroColor] = 0;
      
      // Delete the picked color from array so it can't be picked again
      mainRGB.splice(zeroColorIndex, 1);

      // Pick one of the remaining two colors randomly, to make its value 255
      zeroColorIndex = Math.floor(Math.random() * 2);
      zeroColor = mainRGB[zeroColorIndex];
      colors[zeroColor] = 255;



      cell.style.backgroundColor = `rgb(${colors.red}, ${colors.green}, ${colors.blue})`;
    }
    else {
      cell.style.backgroundColor = 'black';
    }
  }
}

function resetGrid() {
  // Delete all squares and create again
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  buildGrid(squaresPerSide);
  isMouseDown = false;
}

function changeSquaresPerSide() {
  let squares = prompt("Number of squares per side: ");
  if (squares !== null) {
    squares = Number(squares);
    if (squares > 100 || squares < 2) {
      alert('Number of squares must be between 2 and 100');
      changeSquaresPerSide();
    }
    else {
      squaresPerSide = squares;
    }
  }
}

// Eraser button
let isEraser = false;
let eraserButton = document.querySelector('#eraser');
eraserButton.addEventListener('click', event => {
  addToggleStyle(event.target);
  // Change the flag's value
  isEraser = isEraser ? false : true;
});

let isRgb = false;
let rgbButton = document.querySelector('#rgb');
rgbButton.addEventListener('click', event => {
  // In order to emphasize the active button, add some styling
  addToggleStyle(event.target);
  isRgb = isRgb ? false : true;
});

// In order to emphasize active button, add some styling
function addToggleStyle(element) {
  if (element.classList.contains('toggle')) {
    element.classList.remove('toggle')
  }
  else {
    element.classList.add('toggle');
  } 
}
