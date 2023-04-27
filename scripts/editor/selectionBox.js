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
    /**@type {boolean} */
    mouseDown;

    constructor(){
        this.hovered = null;
        this.selected = [];
        this.mouseDown = true;
    }

    /**
     * Draws the selection box if needed to the coordinates specified.
     */
    draw(X, Y){
        //if we aren't even selecting anything
        if(this.startX == null) return;

        //If selection box would be too small
        if(this.hypSize < global.minSelectBox) return;

        //If we are grabbing an item
        if(this.grabbing) return;

        //If mouse is not down
        if(!this.mouseDown) return;

        global.editor.ctx.beginPath();
        global.editor.ctx.fillStyle = global.selectionColor;
        global.editor.ctx.fillRect(this.startX, this.startY, X-this.startX, Y-this.startY);

    }

    get hypSize(){
        return Math.sqrt(Math.pow(this.startX-this.endX, 2) + Math.pow(this.startY-this.endY, 2));

    }

    start(X, Y){
        this.mouseDown = true;
        this.startX = X;
        this.startY = Y;

        let selectedNode = global.graph.getNode(X, Y);
        if(selectedNode == null){
            return;

        }
        this.grabbing = true;
        selectedNode.selected = true;
        this.selected.push(selectedNode);
        console.log(this.selected);

    }

    update(X, Y){
        let moveX = X-this.endX;
        let moveY = Y-this.endY;

        this.endX = X;
        this.endY = Y;

        if(this.selected.length == 0) return;

        for(let node of this.selected){
            console.log(typeof node);
            node.moveBy(moveX, moveY);

        }

    }

    end(X, Y){
        console.log("end was called");
        this.mouseDown = false;
        this.endX = X;
        this.endY = Y;

        if(!this.grabbing){
            this.grabbing = false;

            this.selected.length = 0;
            let newSelection = global.graph.getNodes(this.startX, this.startY, this.endX, this.endY);
            if(newSelection == null) return;
            if(newSelection.length != 0) this.selected.push(newSelection);

        }


    }

}