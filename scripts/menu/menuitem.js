class MenuItem{

    modeValue;
    image;
    altText;
    title;

    /**
     * 
     * @param {MenuMode} modeValue - mode menuItem should set on click
     * @param {String} imagePath - Path to image
     * @param {String} alt - Alternative text to the image
     * @param {String} title - title attribute for the image
     * @param {HTMLBodyElement} home - the element to which the image should be appended
     */
    constructor(modeValue, imagePath, alt, title, home){

        this.image = document.createElement("img");
        this.image.src = imagePath;
        this.image.className = "menuItem";
        this.image.alt = alt;
        this.image.title = title;

        this.image.onclick = function(){
            global.editor.mode = modeValue;

        }

        home.appendChild(this.image);
    }
}