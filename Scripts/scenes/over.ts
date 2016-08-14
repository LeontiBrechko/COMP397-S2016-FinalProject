/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 8, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.2 - Version includes level 1 and 2
 */

module scenes {
    export class Over extends objects.Scene {
        //  PRIVATE INSTANCE VARIABLES
        private _space:objects.Space;
        private _gameOverLabel:objects.Label;
        private _finalScoreLabel:objects.Label;
        private _bulletsCollectedLabel:objects.Label;
        private _restartButton:objects.Button;
        private _restartLevelButton:objects.Button;
        private _exitButton:objects.Button;

        /**
         * Creates an instance of Menu.
         *
         */
        constructor() {
            super();
        }

        /**
         *
         */
        public start():void {
            this._space = new objects.Space("space");
            this.addChild(this._space);

            if (core.wonGame) {
                this._gameOverLabel = new objects.Label(
                    "CONGRATULATIONS!", "40px", "BroadwayFont", "#7200ff",
                    320, 80, true
                );
            } else if (core.fuelLevel == 0) {
                this._gameOverLabel = new objects.Label(
                    "GAME OVER: RUN OUT OF FUEL", "40px", "BroadwayFont", "#7200ff",
                    320, 80, true
                );
            } else {
                this._gameOverLabel = new objects.Label(
                    "NO MORE LIVES - GAME OVER!", "40px", "BroadwayFont", "#7200ff",
                    320, 80, true
                );
            }
            this.addChild(this._gameOverLabel);

            this._finalScoreLabel = new objects.Label(
                "FINAL SCORE: " + core.score, "40px", "BroadwayFont", "#7200ff",
                320, 180, true
            );
            this.addChild(this._finalScoreLabel);

            this._bulletsCollectedLabel = new objects.Label(
                "BULLETS COLLECTED: " + core.bulletsCollected, "40px", "BroadwayFont", "#7200ff",
                320, 230, true
            );
            this.addChild(this._bulletsCollectedLabel);

            // add the restart button
            this._restartButton = new objects.Button(
                "restartButton", 320, 390, true
            );
            this._restartButton.on("click", this._restartButtonClick, this);
            this.addChild(this._restartButton);

            if (!core.wonGame) {
                // add the restart level button
                this._restartLevelButton = new objects.Button(
                    "restartLevelButton", 320, 340, true
                );
                this._restartLevelButton.on("click", this._restartLevelButtonClick, this);
                this.addChild(this._restartLevelButton);
            }

            // add the exit button
            this._exitButton = new objects.Button(
                "exitButton", 320, 440, true
            );
            this.addChild(this._exitButton);

            // Exit button event listener
            this._exitButton.on("click", this._exitButtonClick, this);

            // add this scene to the global scene container
            core.stage.addChild(this);
        }

        public update():void {
            this._space.update();
            this._gameOverLabel.alpha == 1 ? this._gameOverLabel.alpha = 0 : this._gameOverLabel.alpha = 1;
            // scene updates happen here...
        }

        // EVENT HANDLERS ++++++++++++++++
        private _restartButtonClick(event:createjs.MouseEvent):void {
            // Switch the scene
            core.currentLives = core.gameStartingLives;
            core.score = 0;
            core.bulletsCollected = 0;
            core.robotCurrentLives = core.robotStartingLives;
            core.scene = config.Scene.PLAY;
            core.wonGame = false;
            core.changeScene();
        }

        private _restartLevelButtonClick(event:createjs.MouseEvent):void {
            let currentLevel = core.play.levelNumber;
            if (currentLevel == config.Level.LEVEL_1) {
                core.score = 0;
                core.currentLives = core.gameStartingLives;
            } else if (currentLevel == config.Level.LEVEL_2) {
                core.bulletsCollected = 0;
                core.currentGunBullets = 0;
                core.currentLives = core.levelStartingLives;
            } else if (currentLevel == config.Level.LEVEL_3) {
                core.currentGunBullets = core.levelStartingBullets;
                core.bulletsCollected = core.levelStartingBullets;
                core.currentLives = core.levelStartingLives;
                core.robotCurrentLives = core.robotStartingLives;
            }
            core.scene = config.Scene.PLAY;
            core.changeScene();
            core.play.levelNumber = currentLevel;
            createjs.Sound.stop();
            core.play.ChangeLevel();
        }

        private _exitButtonClick(event:createjs.MouseEvent):void {
            // Switch the scene
            core.scene = config.Scene.EXIT;
            core.changeScene();
        }
    }
}