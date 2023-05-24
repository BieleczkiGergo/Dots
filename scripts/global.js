/**
 * @typedef {Number} MenuMode
 */
let modes = {
    grab : 1,
    newNode : 2,
    newConnection : 3,
    selectConnection : 4,
    deleteNode : 5,

}


let global = {
    /**Default configurations for nodes */
    nodeConf : {
        size : 25,
        color : "#ff0000",
        text : "new node",

    },
    minSelectBox : 25,
    /** @type {HTMLCanvasElement} */
    canvas : document.getElementById("editorCanvas"),
    /**@type {Graph}*/
    graph : new Graph(),
    selectionColor : "rgba(44, 138, 226, 0.5)",

}
