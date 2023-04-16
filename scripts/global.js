/**
 * @typedef {Number} MenuMode
 */
let modes = {
    grab : 1,
    newNode : 2,
    newConnection : 3,

}


let global = {
    /**Default configurations for nodes */
    nodeConf : {
        size : 25,
        color : "#ff0000",
        text : "new node",

    },
    minSelectBox : 25,
    editor : {
        /** @type {MenuMode} */
        mode : modes.grab,
        /** @type {HTMLCanvasElement} */
        body : null,
        /** @type {CanvasRenderingContext2D} */
        ctx : null,
        /** @type {Number} */
        X : 0,
        /** @type {Number} */
        Y : 0,
        /** @type {Number} */
        width : 0,
        /** @type {Number} */
        height : 0,
        
    },
    /**@type {Graph}*/
    graph : new Graph(),
    selectionColor : "rgba(44, 138, 226, 0.5)",

}

//Initialize some of the global variables inside
//other blocks, so that memory is preserved.
//And also, to hide the eyesore.
{//Editor
    global.editor.body = document.getElementById("editorCanvas");
    global.editor.ctx = global.editor.body.getContext("2d");

    let box = global.editor.body.getBoundingClientRect();
    global.editor.X = box.x;
    global.editor.Y = box.y;
    global.editor.width = box.width;
    global.editor.height = box.height;
    global.editor.body.width = Math.round(box.width);
    global.editor.body.height = Math.round(box.height);
}
