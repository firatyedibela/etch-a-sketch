const gridContainer = document.querySelector('#grid-container');
const resetGridBtn = document.querySelector('#reset-grid');
const changeSizeBtn = document.querySelector('#change-size');

document.addEventListener('dragstart', (event) => {
  event.preventDefault();
});

let squaresPerSide = 16;
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
  paintCell(event.target);
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
      colors.red = Math.floor(Math.random() * 255);
      colors.green = Math.floor(Math.random() * 255);
      colors.blue = Math.floor(Math.random() * 255);

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
  addToggleStyle(event.target);
  isRgb = isRgb ? false : true;
});

function addToggleStyle(element) {
  if (element.classList.contains('toggle')) {
    element.classList.remove('toggle')
  }
  else {
    element.classList.add('toggle');
  } 
}
