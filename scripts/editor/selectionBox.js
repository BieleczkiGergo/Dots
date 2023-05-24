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
    selectedNodes;
    /**@type {boolean} */
    grabbing;
    /**@type {boolean} */
    mouseDown;

    constructor(){
        this.hovered = null;
        this.selectedNodes = new Set();
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

        playground.ctx.beginPath();
        playground.ctx.fillStyle = global.selectionColor;
        playground.ctx.fillRect(this.startX, this.startY, X-this.startX, Y-this.startY);

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
        if(!append && !this.selectedNodes.has(selectedNode)) this.clear();

        if(selectedNode == null){
            return;
            
        }
        this.grabbing = true;
        selectedNode.selected = true;
        this.selectedNodes.add(selectedNode);

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

        if(this.selectedNodes.length == 0) return;
        if(!this.grabbing) return;

        for(let node of this.selectedNodes){
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

            //Swap start and end coordinates if neccessary
            if(this.startX > this.endX) [this.startX, this.endX] = [this.endX, this.startX];
            if(this.startY > this.endY) [this.startY, this.endY] = [this.endY, this.startY];
            
            global.graph.getNodes(this.startX, this.startY, this.endX, this.endY).forEach(node => {
                this.selectedNodes.add(node);
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
            this.selectedNodes.add(tempNode);
            tempNode.selected = true;

        }

    }

    clear(){
        this.selectedNodes.forEach((node) => {
            node.selected = false;

        });
        this.selectedNodes.clear();

    }

    deleteNodes(){
        global.graph.deleteNodes(this.selectedNodes);
        this.selectedNodes.clear();

    }

}