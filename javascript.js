/* TODO! 
1. 16 x 16 square div XX done
2. temporary hover effect, on hover:  XX done
    2.1 make color black
    2.2 on hover away, return to default grey color;
3. permanent (for now) click color in effect xxx done
4. eraser button and functionality XX done (most painful so far)
5. reset functionality XX done
6. color wheel! XX done
7. change size of grid
extra credit!:
1.rainbow behaviour! xx done
2. progressive darkening effect? by 10% (opacity helps)
*/

const container_div = document.querySelector(".container")
let mouse_down = false;
document.body.onmousedown = () => (mouse_down = true)
document.body.onmouseup = () => (mouse_down = false)

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "grey";
const DEFAULT_BUTTON_COLOR = "black";
const DEFAULT_MODE = 'color'
const GRID_SIZE = 480;

const color_button = document.querySelector("#color");
const eraser_button = document.querySelector("#eraser");
const reset_button = document.querySelector("#reset");
const rainbow_button = document.querySelector("#rainbow");
const color_wheel = document.querySelector("#color_wheel");
const size_slider = document.querySelector("#slider")
const size_text = document.querySelector("#size");

let current_mode = DEFAULT_MODE;
let current_color = DEFAULT_BUTTON_COLOR;
let current_size = DEFAULT_SIZE;

function init_grid(size){
    // let grid_tile_size = (GRID_SIZE / size) - 2;
    let grid_tile_size = (GRID_SIZE / size);
    for(let i = 0; i < size * size; i++){
        size_text.innerHTML = current_size + " X " + current_size;
        const grid_tile = document.createElement("div");
        grid_tile.classList.add("grid_tile");
        grid_tile.style.backgroundColor = DEFAULT_COLOR;

        grid_tile.style.height = grid_tile_size + "px";
        grid_tile.style.width = grid_tile_size + "px";
        // grid_tile.style.border = "1px solid white"
        grid_tile.setAttribute("draggable", "false");
        grid_tile.style.userSelect = "none";

        grid_tile.addEventListener("mouseover", color_tile);
        grid_tile.addEventListener("mousedown", color_tile);
        grid_tile.addEventListener("mouseleave", color_tile);

        container_div.appendChild(grid_tile);
    }
}

function pick_color(e){
    current_color = e.target.value;
}

function change_size(e){
    current_size = e.target.value;
    reset_grid(e);
}

function color_tile(e){
    if(e.type === "mouseover"){
        if(current_mode === "rainbow"){
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            current_color = `rgb(${randomR}, ${randomG}, ${randomB})`;
        }
        if(current_mode === "eraser"){
            current_color = DEFAULT_COLOR;
        }
        e.target.setAttribute("old_color", e.target.style.backgroundColor);
        e.target.setAttribute("new_color", current_color);
        e.target.style.backgroundColor = e.target.getAttribute("new_color");
    }
    if(e.type === "mousedown" || (e.type === "mouseover" && mouse_down)){
        e.target.setAttribute("new_color", current_color);
        e.target.style.backgroundColor = e.target.getAttribute("new_color");
        e.target.setAttribute("old_color", e.target.style.backgroundColor);
    }
    else if(e.type === "mouseleave"){
        e.target.style.backgroundColor = e.target.getAttribute("old_color");
    }
}

function init_buttons(){
    color_button.onclick = () => toggle_button('color');
    eraser_button.onclick = () => toggle_button('eraser');
    rainbow_button.onclick = () => toggle_button('rainbow');
    reset_button.addEventListener("click", reset_grid);
    color_wheel.addEventListener("input", pick_color, false);
    size_slider.onmouseup = (e) => change_size(e);
}

function toggle_button(new_mode){
    if(current_mode === "color"){
        color_button.style.backgroundColor = "white";
    }
    else if(current_mode === "eraser"){
        eraser_button.style.backgroundColor = "white";
    }
    else if(current_mode === "rainbow"){
        rainbow_button.style.backgroundColor = "white";
    }
    
    current_mode = new_mode;
    if(new_mode === "color"){
        current_color = color_wheel.value;
        color_button.style.backgroundColor = "grey";
    }
    else if(new_mode === "eraser"){
        eraser_button.style.backgroundColor = "grey";
    }
    else if(new_mode === "rainbow"){
        rainbow_button.style.backgroundColor = "grey";
    }
}
function reset_grid(e){
    container_div.replaceChildren();
    init_grid(current_size);
}

window.onload = () => {
    init_grid(current_size);
    init_buttons();
}