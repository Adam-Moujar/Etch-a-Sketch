const container_div = document.querySelector(".container")
let mouse_down = false;
document.body.onmousedown = () => (mouse_down = true)
document.body.onmouseup = () => (mouse_down = false)

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "grey";
const DEFAULT_BUTTON_COLOR = "black";
const DEFAULT_MODE = 'color'

const eraser_button = document.querySelector("#eraser");
const reset_button = document.querySelector("#reset");

let current_mode = DEFAULT_MODE;

function init_grid(size){
    for(let i = 0; i < size * size; i++){
        const grid_tile = document.createElement("div");
        grid_tile.classList.add("grid_tile");
        grid_tile.style.backgroundColor = "gray";
        // ill move these to a css later
        grid_tile.style.height = "28px";
        grid_tile.style.width = "28px";
        grid_tile.style.border = "1px solid white"
        grid_tile.setAttribute("draggable", "false");
        grid_tile.style.userSelect = "none";
        // up
        grid_tile.addEventListener("mouseover", color_tile);
        grid_tile.addEventListener("mousedown", color_tile);
        grid_tile.addEventListener("mouseleave", color_tile);

        container_div.appendChild(grid_tile);
    }
}

function color_tile(e){
    if(current_mode === "color"){
        if(e.type === "mousedown" || e.type === "mouseover" && mouse_down) {
            e.target.style.backgroundColor = DEFAULT_BUTTON_COLOR;
            e.target.removeEventListener("mouseleave", color_tile);
        }
        else if(e.type === "mouseover"){
            e.target.style.backgroundColor = DEFAULT_BUTTON_COLOR;
        }
        else{
            e.target.style.backgroundColor = DEFAULT_COLOR;
        }
    }
    else if(current_mode === "eraser"){
        if(e.type === "mousedown" || e.type === "mouseover" && mouse_down) {
            e.target.style.backgroundColor = DEFAULT_COLOR;
            e.target.addEventListener("mouseleave", color_tile);
        }
    }
}

function init_buttons(){
    eraser_button.addEventListener("click", toggle_eraser);
    reset_button.addEventListener("click", reset_grid);
}

function toggle_eraser(e){
    if(!(current_mode === "eraser")){
        current_mode = "eraser";
        e.target.style.backgroundColor = "grey";
    }
    else{
        current_mode = DEFAULT_MODE;
        e.target.style.backgroundColor = "white";
    }
}

function reset_grid(e){
    container_div.replaceChildren();
    init_grid(DEFAULT_SIZE);
}

window.onload = () => {
    init_grid(DEFAULT_SIZE);
    init_buttons();
}