class Menu{

    menu;

    constructor(){
        this.menu = document.getElementById("menu");

        new MenuItem(modes.grab, "./pics/noIcon.svg", "grab/move nodes", "grab/move", this.menu);
        new MenuItem(modes.newNode, "./pics/noIcon.svg", "new node", "new node", this.menu);
        new MenuItem(modes.newConnection, "./pics/noIcon.svg", "new connection", "new connection", this.menu);

    }
}