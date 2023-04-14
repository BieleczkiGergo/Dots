/**
 * @typedef {Number} MenuMode
 */
let modes = {
    grab : 1,
    newNode : 2,
    newConnection : 3,

}


let global = {
    editor : {
        /** @type {MenuMode} */
        mode : 0,
        /** @type {HTMLCanvasElement} */
        body : null,
        /** @type {CanvasRenderingContext2D} */
        ctx : null,

        X : 0,
        Y : 0,

    },
    graph : [],

}

//initialize some of the global variables
//inside another block, so that memory is preserved
{//Editor
    global.editor.body = document.getElementById("editorCanvas");
    global.editor.ctx = global.editor.body.getContext("2d");

    let box = global.editor.body.getBoundingClientRect();
    global.editor.X = box.x;
    global.editor.Y = box.y;

    global.editor.ctx.width = Math.round(box.width);
    global.editor.ctx.height = Math.round(box.height);

}