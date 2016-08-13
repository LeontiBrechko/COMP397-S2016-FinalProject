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

namespace core {

    // Variable Declarations

    // declare a reference to the Preloader
    export let assets:createjs.LoadQueue;
    // make a reference to the canvas element
    let canvas:HTMLElement = document.getElementById("canvas");
    // create a reference to a stage container
    export let stage:createjs.Stage;

    // score, startingLives and currentLives variables
    export let score:number = 0;
    // export let highScore:number = 0;
    export let startingLives:number = 5;
    export let robotStartingLives:number = 5;
    export let currentLives:number = startingLives;
    export let robotCurrentLives:number = startingLives;
    export let fuelLevel:number = 5;
    export let gunBullets:number = 0;
    export let gameSpeed:number = 1200;
    export let themeSound:createjs.AbstractSoundInstance;
    let startButton:objects.Button; // reference to our button class

    // declare scene variables
    let currentScene:objects.Scene;
    export let scene:number;

    let menu:scenes.Menu;
    let exit:scenes.Exit;
    let over:scenes.Over;
    export let play:scenes.Play;
    let instructions:scenes.Instructions;


    // asset manifest for images and sounds
    let assetData:objects.Asset[] = [
        // button images
        {id: "startButton", src: "Assets/images/startButton.png"},
        {id: "instructionsButton", src: "Assets/images/instructionsButton.png"},
        {id: "restartButton", src: "Assets/images/restartButton.png"},
        {id: "restartLevelButton", src: "Assets/images/restartLevelButton.png"},
        {id: "exitButton", src: "Assets/images/exitButton.png"},
        {id: "returnButton", src: "Assets/images/returnButton.png"},
        // main object images
        {id: "space", src: "Assets/images/space.png"},
        {id: "planet", src: "Assets/images/planet.png"},
        {id: "infectedPlanet", src: "Assets/images/infectedPlanet.png"},
        {id: "zombie", src: "Assets/images/zombie.png"},
        {id: "zombieIcon", src: "Assets/images/zombieIcon.png"},
        {id: "chargedCloud", src: "Assets/images/chargedCloud.png"},
        {id: "fuelBox", src: "Assets/images/fuel.png"},
        {id: "gunBox", src: "Assets/images/gun.png"},
        {id: "liveBox", src: "Assets/images/liveBox.png"},
        {id: "live", src: "Assets/images/live.png"},
        {id: "spaceman", src: "Assets/images/spaceman.png"},
        {id: "bullet", src: "Assets/images/bullet.png"},
        {id: "robot", src: "Assets/images/robot.png"},
        {id: "levelProgress", src: "Assets/images/levelProgress.png"},       
        // sounds
        {id: "baaaa", src: "Assets/audio/baaaa.wav"},
        {id: "explosion", src: "Assets/audio/explosion.wav"},
        {id: "main_theme", src: "Assets/audio/main_theme.wav"},
        {id: "over", src: "Assets/audio/over.wav"},
        {id: "fuelPick", src: "Assets/audio/fuelPick.wav"},
        {id: "gunPick", src: "Assets/audio/gunPick.wav"},
        {id: "laserHit", src: "Assets/audio/laserHit.wav"},
        {id: "taDaFinal", src: "Assets/audio/taDaFinal.wav"},
        {id: "pew", src: "Assets/audio/pew.wav"},
        // stub
        {id: "gameOverStub", src: "Assets/images/gameOverStub.png"},
        {id: "nextLevelStub", src: "Assets/images/nextLevelStub.png"}
    ];

    /**
     * This method preloads assets for the game
     *
     * @method preload
     * @returns {void}
     */
    function preload():void {
        assets = new createjs.LoadQueue(); // instantiates the loader
        assets.installPlugin(createjs.Sound);
        assets.on("complete", init, this);
        assets.loadManifest(assetData);
    }


    /**
     * This method is the entry point for the application
     *
     * @method init
     * @return {void}
     */
    function init():void {
        stage = new createjs.Stage(canvas); // instatiate the stage container
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", gameLoop); // create an event listener for the tick event
        themeSound = createjs.Sound.play("main_theme");
        themeSound.stop();
        themeSound.loop = -1;

        // setup the default scene
        scene = config.Scene.MENU;
        changeScene();
    }

    /**
     * This is the main game loop
     *
     * @method gameLoop
     * @param {createjs.Event} event
     * @returns {void}
     */
    function gameLoop(event:createjs.Event):void {

        // call the scenes's update
        currentScene.update();

        stage.update(); // refreshes the stage
    }

    /**
     * Changes current scene
     *
     * @method changeScene
     * @returns {void}
     */
    export function changeScene():void {
        //Launch Various Scenes
        switch (scene) {
            // Show the MENU Scene
            case config.Scene.MENU:
                stage.removeAllChildren();
                menu = new scenes.Menu();
                currentScene = menu;
                break;
            // Show the PLAY Scene
            case config.Scene.PLAY:
                stage.removeAllChildren();
                play = new scenes.Play();
                currentScene = play;
                break;
            // Show the GAME OVER Scene
            case config.Scene.OVER:
                stage.removeAllChildren();
                over = new scenes.Over();
                currentScene = over;
                break;
            // Shot the INSTRUCTIONS Scene
            case config.Scene.INSTRUCTIONS:
                stage.removeAllChildren();
                instructions = new scenes.Instructions();
                currentScene = instructions;
                break;
            // Shot the EXIT Scene
            case config.Scene.EXIT:
                stage.removeAllChildren();
                exit = new scenes.Exit();
                currentScene = exit;
                break;
        }
    }


    //wait until the window object is finished loading then call the init method
    window.addEventListener("load", preload);

}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++