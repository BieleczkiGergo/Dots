class Graph{

    /**@type {Array} */
    nodes;
    /**@type {...GraphConnection} */
    connections;

    constructor(){
        this.nodes = new Set();
        this.connections = [];

    }

    /**
     * 
     * @param {GraphNode} node1 
     * @param {GraphNode} node2 
     */
    connectMutual(node1, node2){

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

        /**@type {Number} */
        let distance = getDistance(this.nodes[0]);
        /**@type {GraphNode} */
        let closest = this.nodes[0];
        /**@type {Number} declared outside the loop for better performance*/
        let tempDist = distance;
        for(let node of this.nodes){
            tempDist = getDistance(node);
            if(tempDist < distance){
                closest = node;
                distance = tempDist;

            }
        }

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
        let ret = [];
        this.nodes.forEach(node => {
            if(node.X > startX && node.Y > startY && node.X < endX && node.Y < endY){
                ret.push(node);

            }
        });

        return ret;
    }

    /**
     * 
     * @param {Set} targets 
     */
    deleteNodes(targets){
        console.log(targets);
        this.nodes.filter(node => {
            if(targets.has(node)) console.log("common element found");
            return !targets.has(node);

        });
        console.log(this.nodes);

    }

    draw(){
        this.nodes.forEach(node => {
            node.drawConnections();

        });
        this.nodes.forEach(node => {
            node.draw();

        });
    }

}