class GraphNode{
    
    X;
    Y;
    color;
    text;
    size;
    meta;

    /**
     * 
     * @param {Number} X 
     * @param {Number} Y 
     * @param {String} text 
     * @param {String} color 
     * @param {String} size 
     */
    constructor(X, Y, text=global.nodeConf.text, color=global.nodeConf.color, size=global.nodeConf.size){
        this.X = X;
        this.Y = Y;
        this.text = text;
        this.color = color;
        this.size = size;

    }

    moveTo(X, Y){
        this.X = X;
        this.Y = Y;

    }

    draw(){
        global.editor.ctx.beginPath();
        global.editor.ctx.fillStyle = this.color;
        global.editor.ctx.arc(this.X, this.Y, this.size, Math.PI*2, 0);
        global.editor.ctx.fill();

    }
}