export class LoadingScreen {
    constructor() {
   
    }

    hide() {
        const loadingScreen = document.getElementById("loading-screen");
        loadingScreen.remove();
    }
}