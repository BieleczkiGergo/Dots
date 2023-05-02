class Playground{
    
    /**@type {SelectionBox}*/
    selection;
    /**@type {Number}*/
    mouseX;
    /**@type {Number}*/
    mouseY;

    constructor(){
        this.selection = new SelectionBox();

        window.onkeydown = (event) => {
            if(event.keyCode == 46){
                global.graph.deleteNodes(this.selection.selected);
                
            }
        }

        global.editor.body.onmousemove = (event) => {
            this.mouseX = event.clientX - global.editor.X;
            this.mouseY = event.clientY - global.editor.Y;

            if(global.editor.mode == modes.grab){
                this.selection.update(this.mouseX, this.mouseY);

            }
            this.draw();

        }

        global.editor.body.onclick = (event) => {
            if(global.editor.mode == modes.newNode){
                global.graph.addNode(new GraphNode(this.mouseX, this.mouseY));
                this.draw();

            }else if(global.editor.mode == modes.newConnection){
                if(this.selection.selected.size == 0){
                    this.selection.select(this.mouseX, this.mouseY);
                }else{
                    let targetNode = global.graph.getNode(this.mouseX, this.mouseY);
                    if(targetNode != null){
                        this.selection.selected.forEach((node) => {
                            node.connect(targetNode);

                        });

                    }
                }
            }
        }


        global.editor.body.onmousedown = (event) => {
            if(global.editor.mode == modes.grab){
                //If you know why event.shiftKey works in this case, please tell me
                this.selection.start(this.mouseX, this.mouseY, event.shiftKey);

            }
        }

        global.editor.body.onmouseup = (event) => {
            if(global.editor.mode == modes.grab){
                this.selection.end(this.mouseX, this.mouseY, event.shiftKey);

            }
            this.draw();
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