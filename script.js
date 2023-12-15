const gridContainer = document.querySelector('#grid-container');

let squaresPerSide = 20;
gridBuilder(squaresPerSide);

// Get all the cells in the page so we can add event listeners to them
let cells = document.querySelectorAll('.columns');
cells.forEach((cell) => {
  cell.addEventListener('mouseover', (event) => {
    event.target.style.backgroundColor = 'black';
  });
});


function gridBuilder(squaresPerSide) {
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
}