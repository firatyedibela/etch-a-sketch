const gridContainer = document.querySelector('#grid-container');
const resetGridBtn = document.querySelector('#reset-grid');
const changeSizeBtn = document.querySelector('#change-size');

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
    cells.forEach((cell) => {
      cell.addEventListener('mouseover', (event) => {
        event.target.style.backgroundColor = 'black';
      });
    });
}

function resetGrid() {
  // Delete all squares and create again
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  buildGrid(squaresPerSide);
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