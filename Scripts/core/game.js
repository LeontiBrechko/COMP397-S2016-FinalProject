/**
 * Created by Anton on 2016-08-08.
 */
/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 8, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.2 - Version includes level 1 and 2
 */
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var core;
(function (core) {
    // make a reference to the canvas element
    var canvas = document.getElementById("canvas");
    // score, startingLives and currentLives variables
    core.score = 0;
    // export let highScore:number = 0;
    core.startingLives = 5;
    core.currentLives = core.startingLives;
    core.fuelLevel = 5;
    core.gunBullets = 0;
    core.gameSpeed = 2000;
    var startButton; // reference to our button class
    // declare scene variables
    var currentScene;
    var menu;
    var exit;
    var over;
    var instructions;
    // asset manifest for images and sounds
    var assetData = [
        // button images
        { id: "startButton", src: "Assets/images/startButton.png" },
        { id: "instructionsButton", src: "Assets/images/instructionsButton.png" },
        { id: "restartButton", src: "Assets/images/restartButton.png" },
        { id: "restartLevelButton", src: "Assets/images/restartLevelButton.png" },
        { id: "exitButton", src: "Assets/images/exitButton.png" },
        { id: "returnButton", src: "Assets/images/returnButton.png" },
        // main object images
        { id: "space", src: "Assets/images/space.png" },
        { id: "planet", src: "Assets/images/planet.png" },
        { id: "infectedPlanet", src: "Assets/images/infectedPlanet.png" },
        { id: "zombie", src: "Assets/images/zombie.png" },
        { id: "zombieIcon", src: "Assets/images/zombieIcon.png" },
        { id: "chargedCloud", src: "Assets/images/chargedCloud.png" },
        { id: "fuelBox", src: "Assets/images/fuel.png" },
        { id: "gunBox", src: "Assets/images/gun.png" },
        { id: "live", src: "Assets/images/live.png" },
        { id: "spaceman", src: "Assets/images/spaceman.png" },
        { id: "bullet", src: "Assets/images/bullet.png" },
        { id: "levelProgress", src: "Assets/images/levelProgress.png" },
        // sounds
        { id: "baaaa", src: "Assets/audio/baaaa.wav" },
        { id: "explosion", src: "Assets/audio/explosion.wav" },
        { id: "main_theme", src: "Assets/audio/main_theme.wav" },
        { id: "over", src: "Assets/audio/over.wav" },
        { id: "fuelPick", src: "Assets/audio/fuelPick.wav" },
        { id: "gunPick", src: "Assets/audio/gunPick.wav" },
        { id: "laserHit", src: "Assets/audio/laserHit.wav" },
        { id: "taDaFinal", src: "Assets/audio/taDaFinal.wav" },
        { id: "pew", src: "Assets/audio/pew.wav" },
        // stub
        { id: "gameOverStub", src: "Assets/images/gameOverStub.png" },
        { id: "nextLevelStub", src: "Assets/images/nextLevelStub.png" }
    ];
    /**
     * This method preloads assets for the game
     *
     * @method preload
     * @returns {void}
     */
    function preload() {
        core.assets = new createjs.LoadQueue(); // instantiates the loader
        core.assets.installPlugin(createjs.Sound);
        core.assets.on("complete", init, this);
        core.assets.loadManifest(assetData);
    }
    /**
     * This method is the entry point for the application
     *
     * @method init
     * @return {void}
     */
    function init() {
        core.stage = new createjs.Stage(canvas); // instatiate the stage container
        core.stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", gameLoop); // create an event listener for the tick event
        core.themeSound = createjs.Sound.play("main_theme");
        core.themeSound.stop();
        core.themeSound.loop = -1;
        // setup the default scene
        core.scene = config.Scene.MENU;
        changeScene();
    }
    /**
     * This is the main game loop
     *
     * @method gameLoop
     * @param {createjs.Event} event
     * @returns {void}
     */
    function gameLoop(event) {
        // call the scenes's update
        currentScene.update();
        core.stage.update(); // refreshes the stage
    }
    /**
     * Changes current scene
     *
     * @method changeScene
     * @returns {void}
     */
    function changeScene() {
        //Launch Various Scenes
        switch (core.scene) {
            // Show the MENU Scene
            case config.Scene.MENU:
                core.stage.removeAllChildren();
                menu = new scenes.Menu();
                currentScene = menu;
                break;
            // Show the PLAY Scene
            case config.Scene.PLAY:
                core.stage.removeAllChildren();
                core.play = new scenes.Play();
                currentScene = core.play;
                break;
            // Show the GAME OVER Scene
            case config.Scene.OVER:
                core.stage.removeAllChildren();
                over = new scenes.Over();
                currentScene = over;
                break;
            // Shot the INSTRUCTIONS Scene
            case config.Scene.INSTRUCTIONS:
                core.stage.removeAllChildren();
                instructions = new scenes.Instructions();
                currentScene = instructions;
                break;
            // Shot the EXIT Scene
            case config.Scene.EXIT:
                core.stage.removeAllChildren();
                exit = new scenes.Exit();
                currentScene = exit;
                break;
        }
    }
    core.changeScene = changeScene;
    //wait until the window object is finished loading then call the init method
    window.addEventListener("load", preload);
})(core || (core = {}));
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
//# sourceMappingURL=game.js.map