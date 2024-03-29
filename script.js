const gridContainer = document.querySelector('#grid-container');
const resetGridBtn = document.querySelector('#reset-grid');
const changeSizeBtn = document.querySelector('#change-size');

document.addEventListener('dragstart', (event) => {
  event.preventDefault();
});

// Initial grid size
let squaresPerSide = 24;
buildGrid(squaresPerSide);

resetGridBtn.onclick = resetGrid;

function buildGrid(squaresPerSide) {
   for (let i = 0; i < squaresPerSide; i++) {
    const rows = document.createElement('div');
    rows.classList.add('rows');
    gridContainer.appendChild(rows);

    for (let j = 0; j < squaresPerSide; j++) {
      const columns = document.createElement('div');
      columns.style.backgroundColor = 'rgb(255, 255, 255)';
      columns.classList.add('columns');
      rows.appendChild(columns);
    };
   };
   // Register event listeners to all squares to paint them black when hovered
    let cells = document.querySelectorAll('.columns');
    cells.forEach(cell => {
      cell.addEventListener('mousedown', handleDown);
      cell.addEventListener('mouseover', handleHover);
      cell.addEventListener('mouseup', handleUp);
    });
}

function updateGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  buildGrid(squaresPerSide);
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

let customColor = '#000000';

const modes = {
  eraser: false,
  rgb: false,
  darken: false,
  lighten: false,
}

function paintCell(cell) {
  if (cell.classList.contains('columns')) {
    if (modes.eraser) {
      cell.style.backgroundColor = 'rgb(255, 255, 255)';
    }
    else if (modes.rgb) {
      paintRgb(cell);   
    }
    else if (modes.darken) {
      darkenColor(cell);
    }
    else if (modes.lighten) {
      lightenColor(cell);
    }
    else {
      cell.style.backgroundColor = customColor;
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

// Only 1 right ui b button active at a time and only 1 right ui button has activated style at a time
uiButtons = document.querySelectorAll('.ui-button-right');
uiButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    let clickedMode = event.target;
    activateMode(clickedMode);
    toggleButtonStyle(clickedMode);
  });
});

// When clicked a mode-ui-button, make all modes false, make the clicked mode true
function activateMode(clickedMode) {
  for (let key in modes) {
    if (key !== clickedMode.id) {
      modes[key] = false;
    }   
  }
  modes[clickedMode.id] = modes[clickedMode.id] === true ? false : true;
}

// When clicked a right-ui-button, delete all buttons' toggle class, add the toggle class to the clicked one
function toggleButtonStyle(clickedButton) {
  Array.from(uiButtons).forEach((btn) => {
    if (btn.id !== clickedButton.id) {
      btn.classList.remove('toggle');
    } 
  });
  if (clickedButton.classList.contains('toggle')) {
    clickedButton.classList.remove('toggle');
  }
  else {
    clickedButton.classList.add('toggle');
  }
}

function paintRgb(cell) {
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

function darkenColor(cell) {
  // Need to get the rgb values of cell's background color so we can modify them
  let colorString = cell.style.backgroundColor;
  const colors = getRGBValues(colorString);
  // Decrease every single one by 20, eventually it will hit 0
  for (let key in colors) {
    if (colors[key] === 0) {
      continue;
    } 
    else if (colors[key] - 20 <= 0) {
      colors[key] = 0;
    }
    else {
      colors[key] -= 20;
    }
  }

  cell.style.backgroundColor = `rgb(${colors.red}, ${colors.green}, ${colors.blue})`;
}

function lightenColor(cell) {
  const colorString = cell.style.backgroundColor;
  const colors = getRGBValues(colorString);

  for (let key in colors) {
    if (colors[key] === 255) {
      continue;
    }
    else if (colors[key] + 20 >= 255) {
      colors[key] = 255;
    }
    else {
      colors[key] +=20;
    }
  }

  cell.style.backgroundColor = `rgb(${colors.red}, ${colors.green}, ${colors.blue})`;
}

// Darken color and lighten color and paintCustom uses this function
function getRGBValues(colorString) {
  let rgbArray = colorString.match(/\d+/g);
  return {
    red: parseInt(rgbArray[0]),
    green: parseInt(rgbArray[1]),
    blue: parseInt(rgbArray[2]),
  };
}

// Color picker
const colorPicker = document.querySelector('#pen-color');
colorPicker.addEventListener('input', (event) => {
  console.log('new color' + event.target.value);
  customColor = event.target.value;
});

// Update size display when slider moves
const range = document.querySelector('#range-slider');
const gridSizeContainer = document.querySelector('.grid-size');
range.addEventListener('input', (event) => {
  gridSizeContainer.textContent = `Grid size: ${range.value}x${range.value}`;
}); 

// Update grid when slider is released
range.addEventListener('change', (event) => {
  squaresPerSide = range.value;
  updateGrid();
});

// Change canvas color
const canvasColorPicker = document.querySelector('#canvas-color');
console.log(canvasColorPicker.value);
canvasColorPicker.value = '#FFFFFF';
  canvasColorPicker.addEventListener('input', (event) => {
    let cells = document.querySelectorAll('.columns');
    cells.forEach((cell) => {
      cell.style.backgroundColor = event.target.value;
    });
  });

