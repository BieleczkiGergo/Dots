class GraphNode{
    
    X;
    Y;
    moveX;
    moveY;
    selected;
    hovered;
    color;
    text;
    size;
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
        this.connections = [];

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
     * @param {GraphNode} remoteNode 
     */
    connect(remoteNode, backWards=false){
        if(backWards) this.connections.push(new GraphConnection(remoteNode, this));
        else {
            this.connections.push(new GraphConnection(this, remoteNode));

        }
        
    }

    /**
     * 
     * @param {GraphNode} node
     */
    deleteConnectionsToNode(node){
        this.connections.filter(connection =>
            connection.target != node
        );

    }

    delete(){
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