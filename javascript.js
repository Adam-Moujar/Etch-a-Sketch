const container_div = document.querySelector(".container")
for(let i = 0; i < 16 * 16; i++){
    const div = document.createElement("div");
    div.classList.add("grid_square");
    div.style.backgroundColor = "gray";
    div.style.height = "28px";
    div.style.width = "28px";
    div.style.border = "1px solid white"
    div.addEventListener("mouseover", function(e){
        div.style.backgroundColor="black";
    });
    div.addEventListener("mouseleave", function(e){
        div.style.backgroundColor = "gray";
    })

    container_div.appendChild(div);
}
console.log(container_div)