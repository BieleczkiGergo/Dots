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
    /**@type {Array} */
    selected;
    /**@type {boolean} */
    grabbing;

    constructor(){
        this.hovered = null;
        this.selected = [];
    }

    /**
     * Draws the selection box if needed to the coordinates specified.
     */
    draw(X, Y){
        //if we aren't even selecting anything: it's enough to check one coordinate
        if(this.startX == null) return;

        //If selection box would be too small
        if(this.hypSize < global.minSelectBox) return;

        //If we are grabbing an item
        if(grabbing) return;

        global.editor.ctx.beginPath();
        global.editor.ctx.fillStyle = global.selectionColor;
        global.editor.ctx.fillRect(this.startX, this.startY, X-this.startX, Y-this.startY);

    }

    get hypSize(){
        return Math.sqrt(Math.pow(this.startX-this.endX, 2) + Math.pow(this.startY-this.endY, 2));

    }

    start(X, Y){
        this.startX = X;
        this.startY = Y;

        let selectedNode = global.graph.getNode(X, Y);
        if(selectedNode == null){
            return;

        }
        this.grabbing = true;
        selectedNode.selected = true;
        this.selected.push(selectedNode);

    }

    update(X, Y){
        this.endX = X;
        this.endY = Y;

        for(let node of this.selected){
            node.moveBy(this.endX-this.startX, this.endY-this.startY);

        }

    }

    end(X, Y){
        this.endX = X;
        this.endY = Y;

        if(!this.grabbing){
            this.selected.length = 0;
            this.selected.push(global.graph.getNodes(this.startX, this.startY, this.endX, this.endY));

        }

        this.grabbing = false;

    }

}