class GraphConnection{

    base;
    target;
    color;
    width;

    /**
     * Creates a new connection
     * @param {GraphNode} base 
     * @param {GraphNode} target 
     */
    constructor(base, target, color="black", width=2){
        this.base = base;
        this.target = target;
        this.color = color;
        this.width = width;

    }

    draw(){
        playground.ctx.beginPath();
        playground.ctx.moveTo(this.base.X, this.base.Y);
        playground.ctx.strokeStyle = this.color;
        playground.ctx.lineWidth = this.width;
        playground.ctx.lineTo(this.target.X, this.target.Y);

        playground.ctx.stroke();

    }
}