const grid = document.getElementById('grid');
const colorSelector = document.getElementById('colorSelector');
const eraser = document.getElementById('eraser');
const reset = document.getElementById('reset');
const rainbow = document.getElementById('rainbow');
const slider = document.getElementById('slider');

let gridSize = 16; 
let mouseDown = false;
let currentColor = "#111"
let currentMode = "color"

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createGrid(size) {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.setAttribute("draggable", "false");

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.setAttribute("draggable", "false");
        square.addEventListener('mouseover', colorTile);
        square.style.userSelect = "none";
        grid.appendChild(square);
    }
}

function colorTile(e){
    if(mouseDown && currentMode === "color"){
        e.target.style.backgroundColor = currentColor;
    }
    else if(mouseDown && currentMode === "erase"){
        e.target.style.backgroundColor = "white";
    }
    else if(mouseDown && currentMode === "rainbow"){
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor =  `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
}

function init_buttons(){
    colorSelector.value = "#111";
    colorSelector.addEventListener("input", pickColor, false);
    colorSelector.addEventListener("mouseover", styleButton);
    colorSelector.addEventListener("mouseleave", unStyleButton);

    eraser.addEventListener("click", eraseColor);
    eraser.addEventListener("mouseover", styleButton);
    eraser.addEventListener("mouseleave", unStyleButton);

    reset.addEventListener("click", resetGrid);
    reset.addEventListener("mouseover", styleButton);
    reset.addEventListener("mouseleave", unStyleButton);

    rainbow.addEventListener("click", rainbowColor);
    rainbow.addEventListener("mouseover", styleButton);
    rainbow.addEventListener("mouseleave", unStyleButton);

    slider.value = "16";
    slider.addEventListener("input", changeSize);
}

function changeSize(e){
    gridSize = e.target.value;
    resetGrid();
}

function rainbowColor(e){
    if(currentMode === "rainbow"){
        e.target.style.backgroundColor = "lightgray";
        e.target.addEventListener("mouseover", styleButton);
        e.target.addEventListener("mouseleave", unStyleButton);
        currentMode = "color";
    }
    else {
        eraser.style.backgroundColor = "lightgray";
        eraser.addEventListener("mouseover", styleButton);
        eraser.addEventListener("mouseleave", unStyleButton);
        eraser.style.color = "black";

        e.target.style.backgroundColor = "gray";
        e.target.removeEventListener("mouseover", styleButton);
        e.target.removeEventListener("mouseleave", unStyleButton);
        currentMode = "rainbow";
    }
}

function styleButton(e){
    e.target.style.backgroundColor = "#6FA3EF";
    e.target.style.color = "white";
}

function unStyleButton(e){
    e.target.style.backgroundColor = "lightgray";
    e.target.style.color = "black";
}

function eraseColor(e){
    if(currentMode === "erase"){
        e.target.style.backgroundColor = "lightgray";
        e.target.addEventListener("mouseover", styleButton);
        e.target.addEventListener("mouseleave", unStyleButton);
        currentMode = "color";
    }
    else {
        rainbow.style.backgroundColor = "lightgray";
        rainbow.addEventListener("mouseover", styleButton);
        rainbow.addEventListener("mouseleave", unStyleButton);
        rainbow.style.color = "black";

        e.target.style.backgroundColor = "gray";
        e.target.removeEventListener("mouseover", styleButton);
        e.target.removeEventListener("mouseleave", unStyleButton);
        currentMode = "erase";
    }
}

function resetGrid(){
    grid.replaceChildren();
    createGrid(gridSize);
}

function pickColor(e){
    currentColor = e.target.value;
}

createGrid(gridSize);
init_buttons();