const gridContainer = document.querySelector('#grid-container');

let squaresPerSide = 20;

gridBuilder(squaresPerSide);

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