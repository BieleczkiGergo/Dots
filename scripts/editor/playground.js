class Playground{
    
    /**@type {SelectionBox}*/
    selection;
    /**@type {Number}*/
    mouseX;
    /**@type {Number}*/
    mouseY;
    /** @type {MenuMode} */
    mode = modes.grab;
    /** @type {HTMLCanvasElement} */
    body = null;
    /** @type {CanvasRenderingContext2D} */
    ctx = null;
    /** @type {Number} */
    X = 0;
    /** @type {Number} */
    Y = 0;
    /** @type {Number} */
    width = 0;
    /** @type {Number} */
    height = 0;

    
    constructor(){
        this.body = document.getElementById("editorCanvas");
        this.ctx = this.body.getContext("2d");
    
        let box = this.body.getBoundingClientRect();
        this.X = box.x;
        this.Y = box.y;
        this.width = box.width;
        this.height = box.height;
        this.body.width = Math.round(box.width);
        this.body.height = Math.round(box.height);

        this.selection = new SelectionBox();

        window.onkeydown = (event) => {
            if(event.keyCode == 46){
                this.selection.deleteNodes();
                this.draw();
                
            }
        }

        this.body.onmousemove = (event) => {
            this.mouseX = event.clientX - this.X;
            this.mouseY = event.clientY - this.Y;

            if(this.mode == modes.grab){
                this.selection.update(this.mouseX, this.mouseY);

            }
            this.draw();

        }

        this.body.onclick = (event) => {
            if(this.mode == modes.newNode){
                global.graph.addNode(new GraphNode(this.mouseX, this.mouseY));
                this.draw();

            }else if(this.mode == modes.newConnection){
                if(this.selection.selectedNodes.size == 0){
                    this.selection.select(this.mouseX, this.mouseY);

                }else{
                    let targetNode = global.graph.getNode(this.mouseX, this.mouseY);
                    if(targetNode != null){
                        this.selection.selectedNodes.forEach((baseNode) => {
                            global.graph.connect(baseNode, targetNode);

                        });

                    }
                }
            }
        }


        this.body.onmousedown = (event) => {
            if(this.mode == modes.grab){
                //If you know why event.shiftKey works in this case, please tell me
                this.selection.start(this.mouseX, this.mouseY, event.shiftKey);

            }
        }

        this.body.onmouseup = (event) => {
            if(this.mode == modes.grab){
                this.selection.end(this.mouseX, this.mouseY, event.shiftKey);

            }
            this.draw();
        }
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, this.width, this.height);

        global.graph.draw();
        this.selection.draw(this.mouseX, this.mouseY);
    }

}