class Graph{

    /**@type {...GraphNode} */
    nodes;
    /**@type {...GraphConnection} */
    connections;

    constructor(){
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
        const getDistance = (node)=>{
            return Math.sqrt(Math.pow(node.X-X, 2) + Math.pow(node.Y-Y, 2));
            
        }

        let distance = Math.sqrt(Math.pow(this.nodes[0].X-X, 2) + Math.pow(this.nodes[0].Y-Y, 2));
        /**@type {GraphNode} */
        let closest = this.nodes[0];
        for(let node in this.nodes){
            if(Math.sqrt(Math.pow(node.X-X, 2) + Math.pow(node.Y-Y, 2)) < distance){
                closest = node;
            }
        }
        console.log(closest);
        if(distance > closest.size){
            return null;
        }
        return closest;
    }

    /**
     * Get all nodes in the specified rectangle
     * @param {Number} startX 
     * @param {Number} startY 
     * @param {Number} endX 
     * @param {Number} endY 
     * @returns {Array}
     */
    getNodes(startX, startY, endX, endY){

    }

    draw(){
        for(let node of this.nodes){
            node.draw();

        }
    }

}