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
        global.editor.ctx.beginPath();
        global.editor.ctx.moveTo(this.base.X, this.base.Y);
        global.editor.ctx.strokeStyle = this.color;
        global.editor.ctx.lineWidth = this.width;
        global.editor.ctx.lineTo(this.target.X, this.target.Y);

        global.editor.ctx.stroke();

    }
}