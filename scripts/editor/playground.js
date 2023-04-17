class Playground{
    
    /**@type {SelectionBox}*/
    selection;
    /**@type {Number}*/
    mouseX;
    /**@type {Number}*/
    mouseY;

    constructor(){
        this.selection = new SelectionBox();

        global.editor.body.onmousemove = (event) => {
            this.mouseX = event.clientX - global.editor.X;
            this.mouseY = event.clientY - global.editor.Y;

            if(global.editor.mode == modes.grab){
                this.selection.updatePos(this.mouseX, this.mouseY);

            }
            this.draw();

        }

        global.editor.body.onclick = (event) => {
            if(global.editor.mode == modes.newNode){
                console.log(global.graph);
                global.graph.addNode(new GraphNode(this.mouseX, this.mouseY));
                this.draw();

            }
        }


        global.editor.body.onmousedown = (event) => {
            if(global.editor.mode == modes.grab){
                this.selection.startSelection(this.mouseX, this.mouseY);

            }
        }

        global.editor.body.onmouseup = (event) => {
            if(global.editor.mode == modes.grab){
                this.selection.select(this.mouseX, this.mouseY);

            }
        }
    }

    draw(){
        global.editor.ctx.beginPath();
        global.editor.ctx.fillStyle = "#ffffff";
        global.editor.ctx.fillRect(0, 0, global.editor.width, global.editor.height);

        global.graph.draw();
        this.selection.draw(this.mouseX, this.mouseY);
    }

}