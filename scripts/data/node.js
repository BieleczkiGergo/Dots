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

    }

    moveTo(X, Y){
        this.X = X;
        this.Y = Y;

    }

    moveBy(X, Y){
        this.X += X;
        this.Y += Y;

    }

    draw(){
        global.editor.ctx.beginPath();
        global.editor.ctx.fillStyle = this.color;
        global.editor.ctx.arc(this.X, this.Y, this.size, Math.PI*2, 0);
        global.editor.ctx.fill();
        if(this.selected){
            global.editor.ctx.strokeStyle == "cyan";
            global.editor.ctx.stroke();
        }

    }
}