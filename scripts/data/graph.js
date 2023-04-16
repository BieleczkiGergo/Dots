class Graph{

    /**@type {...GraphNode} */
    nodes;
    /**@type {...GraphConnection} */
    connections;

    constructor(){
        console.log("graph is being constructed");
        console.log(this.addNode);
        this.nodes = [];
        this.connections = [];

    }

    /**
     * @param {GraphNode} node 
     */
    addNode(node){
        this.nodes.push(node);

    }

    /**
     * Get node at specified coordinates.
     * @param {Number} X 
     * @param {Number} Y 
     * @returns {GraphNode}
     */
    getNode(X, Y){

    }

    /**
     * Get all nodes in the specified rectangle
     * @param {Number} startX 
     * @param {Number} startY 
     * @param {Number} endX 
     * @param {Number} endY 
     * @returns {...GraphNode}
     */
    getNodes(startX, startY, endX, endY){

    }

    draw(){
        for(let node of this.nodes){
            node.draw();

        }
    }

}