class SelectionBox{


    /**@type {...GraphNode} */
    nodes;
    /**@type {Number} - X of where selection started*/
    X;
    /**@type {Number} - Y of where selection started*/
    Y;
    /**@type {GraphNode}*/
    hovered;

    constructor(){
        this.hovered = null;
        this.nodes = [];
    }

    /**
     * Draws the selection box if needed to the coordinates specified.
     * @param {Number} X 
     * @param {Number} Y 
     */
    draw(X, Y){
        if(this.X == null || this.Y == null){
            return;
            
        }
        if(Math.sqrt(Math.pow(this.X-X, 2) + Math.pow(this.Y-Y, 2)) < global.minSelectBox){
            return;

        }
        global.editor.ctx.beginPath();
        global.editor.ctx.fillStyle = global.selectionColor;
        global.editor.ctx.fillRect(this.X, this.Y, X-this.X, Y-this.Y);

    }

    hypSize(){

    }

    startSelection(X, Y){
        this.X = X;
        this.Y = Y;

    }

    /**
     * 
     * @param {Number} X 
     * @param {Number} Y 
     * @param {Number} connection 
     */
    select(X, Y, connection=false){

        this.X = null;
        this.Y = null;
    }
}