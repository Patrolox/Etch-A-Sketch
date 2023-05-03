const container = document.querySelector(".container");
const resetButton = document.querySelector("#reset-button");
const clearButton = document.querySelector("#clear-button");
const greyscaleButton = document.querySelector("#greyscale-button");
const blackButton = document.querySelector("#black-button");
const rgbButton = document.querySelector("#rgb-button");

let gridSize = 16; //defualt grid size
let color = "black";
let pass = 0;

function createGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    // square.style.outline = "1px solid red";
    square.classList.add("square");
    container.appendChild(square);

    square.addEventListener("mouseover", function () {
      if (color === "greyscale") {
        addGreyscaleEffect(square, passChecker());
      } else if (color === "rgb") {
        addRGBEffect(square);
      } else {
        square.style.backgroundColor = color;
      }
    });
  }
}

function passChecker() {
  //checks if mouse hovered 10 times over squares if so starts counitng from 0
  pass++;
  if (pass > 10) {
    pass = 0;
  }
  console.log(pass);
  return pass;
}

function addGreyscaleEffect(square, pass) {
  //based on pass change grey lightness
  square.style.backgroundColor = `hsl(0, 0%, ${100 - pass * 10}%)`;
}

function addRGBEffect(square) {
  //based on pass change color from RGB palette
  let value = Math.floor(Math.random() * 256);
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

blackButton.addEventListener("click", function () {
  color = "black";
});

greyscaleButton.addEventListener("click", function () {
  color = "greyscale";
});

rgbButton.addEventListener("click", function () {
  color = "rgb";
});

clearButton.addEventListener("click", function () {
  // Clear the grid
  const squares = document.querySelectorAll(".square");
  squares.forEach(function (square) {
    square.style.backgroundColor = "white";
  });
});

resetButton.addEventListener("click", function () {
  while (container.firstChild) {
    container.removeChild(container.firstChild); //remove old squares before creating new ones
  }

  // Ask user for new grid size
  let newSize = prompt("Enter new grid size (max 100)");
  if (newSize !== null) {
    newSize = parseInt(newSize);
    if (newSize > 0 && newSize <= 100) {
      createGrid(newSize);
    } else {
      alert("Please enter a number between 1 and 100");
    }
  }
});

createGrid(gridSize);
