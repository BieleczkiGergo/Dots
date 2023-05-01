class SelectionBox{

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
    /**@type {Set} */
    selected;
    /**@type {boolean} */
    grabbing;
    /**@type {boolean} */
    mouseDown;

    constructor(){
        this.hovered = null;
        this.selected = new Set();
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

    /**
     * Start the selectionBox at coordinates.
     * Used on mousedown.
     * @param {Number} X 
     * @param {Number} Y 
     * @param {Boolean} append - whether to append to current selection or replace
     * @returns {null}
     */
    start(X, Y, append=false){
        this.mouseDown = true;
        this.startX = X;
        this.startY = Y;

        let selectedNode = global.graph.getNode(X, Y);
        if(!append && !this.selected.has(selectedNode)) this.clear();

        if(selectedNode == null){
            return;
            
        }
        this.grabbing = true;
        selectedNode.selected = true;
        this.selected.add(selectedNode);

    }

    /**
     * Updates the selectionBox at cordinates.
     * Used on mousemove.
     * @param {Number} X 
     * @param {Number} Y 
     * @returns {null}
     */
    update(X, Y){
        let moveX = X-this.endX;
        let moveY = Y-this.endY;

        this.endX = X;
        this.endY = Y;

        if(this.selected.length == 0) return;
        if(!this.grabbing) return;

        for(let node of this.selected){
            node.moveBy(moveX, moveY);

        }

    }

    /**
     * Ends the selectionBox at specified coordinates, selecting the area if needed.
     * Used on mousedown.
     * @param {Number} X 
     * @param {Number} Y 
     * @param {Boolean} append - whether to append to current selection or replace
     */
    end(X, Y, append=false){
        this.mouseDown = false;
        this.endX = X;
        this.endY = Y;

        if(this.grabbing){
            this.grabbing = false;

        }else{
            if(!append) this.clear();
            global.graph.getNodes(this.startX, this.startY, X, Y).forEach(node => {
                this.selected.add(node);
                node.selected = true;

            });

        }


    }

    /**
     * Quickly selects a node (not an area) at given coordinates.
     * Used on click event.
     * @param {Number} X
     * @param {Number} Y
     * @returns {null}
     */
    select(X, Y){
        let tempNode = global.graph.getNode(X, Y);
        if(tempNode != null){
            this.selected.add(tempNode);
            tempNode.selected = true;

        }

    }

    clear(){
        this.selected.forEach((node) => {
            node.selected = false;

        });
        this.selected.clear();

    }

}