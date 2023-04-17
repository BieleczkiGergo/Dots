class SelectionBox{


    /**@type {Array} */
    nodes;
    /**@type {Number} - X of where selection started*/
    startX;
    /**@type {Number} - Y of where selection started*/
    startY;
    /**@type {Number} - X of where selection currently is*/
    endX;
    /**@type {Number} - Y of where selection currently is*/
    endY;
    /**@type {GraphNode}*/
    hovered;
    /**@type {GraphNode} */
    selected;
    /**@type {boolean} */
    grabbing;

    constructor(){
        this.hovered = null;
        this.nodes = [];
    }

    /**
     * Draws the selection box if needed to the coordinates specified.
     */
    draw(X, Y){
        if(this.startX == null || this.startY == null){
            return;
            
        }
        //If selection box would be too small
        if(this.hypSize < global.minSelectBox){
            return;

        }
        global.editor.ctx.beginPath();
        global.editor.ctx.fillStyle = global.selectionColor;
        global.editor.ctx.fillRect(this.startX, this.startY, X-this.startX, Y-this.startY);

    }

    get hypSize(){
        return Math.sqrt(Math.pow(this.startX-this.endX, 2) + Math.pow(this.startY-this.endY, 2));

    }

    startSelection(X, Y){
        this.nodes.push(global.graph.getNode());
        
        console.log(this.nodes.length);
        if(this.nodes.length != 0){
            this.grabbing = true;
        }
        this.startX = X;
        this.startY = Y;
        this.nodes[0].selected = true;

    }

    updatePos(X, Y){
        this.endX = X;
        this.endY = Y;
        if(this.nodes.length != 0){
            this.nodes[0].moveTo(X, Y);

        }
    }

    /**
     * 
     * @param {Number} X 
     * @param {Number} Y 
     * @param {Number} connection 
     */
    select(X, Y, connection=false){
        this.startX = null;
        this.startY = null;
    }
}