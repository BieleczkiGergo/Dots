/**
 * @typedef {String} CSSColorLiteral
 */

class GraphNode{
    
    X;
    Y;
    moveX;
    moveY;
    selected;
    hovered;
    /**@type {CSSColorLiteral} */
    color;
    /**@type {String} */
    text;
    /**@type {Number} */
    size;
    /**@type {Set} */
    connections;
    meta;

    /**
     * 
     * @param {Number} X 
     * @param {Number} Y 
     * @param {Number} size 
     * @param {String} text 
     * @param {String} color 
     */
    constructor(X, Y, text=global.nodeConf.text, color=global.nodeConf.color, size=global.nodeConf.size){
        this.X = X;
        this.Y = Y;
        this.text = text;
        this.color = color;
        this.size = size;
        this.connections = new Set();

    }

    moveTo(X, Y){
        this.X = X;
        this.Y = Y;

    }

    moveBy(X, Y){
        this.X += X;
        this.Y += Y;

    }

    /**
     * Connects to remoteNode, pointing to remoteNode
     * deprecated
     * @param {GraphNode} remoteNode 
     */
    connect(remoteNode, backWards=false){
        if(backWards) this.connections.push(new GraphConnection(remoteNode, this));
        else {
            this.connections.add(new GraphConnection(this, remoteNode));

        }
        
    }

    disconnect(connection){

    }

    disconnectNode(){
        
    }

    addConnection(connection){
        this.connections.add(connection);
    }

    /**
     * 
     * @param {GraphNode} node
     */
    deleteConnection(connection){
        console.log(this.connections.delete(connection));
        

    }

    delete(){
        console.log("node is being deleted");
        this.connections.forEach(connection => {
            if(connection.target != this) connection.target.deleteConnection(connection);
            //No need to delete it in current node, because the node will be deallocated
        })
    }

    drawConnections(){
        this.connections.forEach(connection => {
            if(connection.base == this) connection.draw();
            
        });
    }

    draw(){
        global.editor.ctx.beginPath();
        global.editor.ctx.fillStyle = this.color;
        global.editor.ctx.arc(this.X, this.Y, this.size, Math.PI*2, 0);
        global.editor.ctx.fill();
        if(this.selected){
            global.editor.ctx.strokeStyle = "blue";
            global.editor.ctx.lineWidth = 5;
            global.editor.ctx.stroke();
        }

    }
}