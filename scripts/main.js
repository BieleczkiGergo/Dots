new Menu();
const playground = new Playground();

window.onkeydown = (event) => {
    playground.keydown(event);

}

global.canvas.onmousemove = (event) => {
    playground.mousemove(event);

}

global.canvas.onclick = (event) => {
    playground.click(event);

}

global.canvas.onmousedown = (event) => {
    playground.mousedown(event);

}

global.canvas.onmouseup = (event) => {
    playground.mouseup(event);

}
