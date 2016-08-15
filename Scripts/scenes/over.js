/**
 * @filename: over.ts
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 15, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.3 - Version includes levels 1, 2, and 3
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Over = (function (_super) {
        __extends(Over, _super);
        /**
         * Creates an instance of Menu.
         *
         */
        function Over() {
            _super.call(this);
        }
        /**
         *
         */
        Over.prototype.start = function () {
            this._space = new objects.Space("space");
            this.addChild(this._space);
            if (core.wonGame) {
                createjs.Sound.play("taDaFinal");
                this._gameOverLabel = new objects.Label("CONGRATULATIONS!", "40px", "BroadwayFont", "#7200ff", 320, 80, true);
            }
            else if (core.fuelLevel == 0) {
                this._gameOverLabel = new objects.Label("GAME OVER: RUN OUT OF FUEL", "30px", "BroadwayFont", "#7200ff", 320, 80, true);
            }
            else {
                this._gameOverLabel = new objects.Label("NO MORE LIVES - GAME OVER!", "40px", "BroadwayFont", "#7200ff", 320, 80, true);
            }
            this.addChild(this._gameOverLabel);
            this._finalScoreLabel = new objects.Label("FINAL SCORE: " + core.score, "40px", "BroadwayFont", "#7200ff", 320, 180, true);
            this.addChild(this._finalScoreLabel);
            this._bulletsCollectedLabel = new objects.Label("BULLETS COLLECTED: " + core.bulletsCollected, "40px", "BroadwayFont", "#7200ff", 320, 230, true);
            this.addChild(this._bulletsCollectedLabel);
            // add the restart button
            this._restartButton = new objects.Button("restartButton", 320, 390, true);
            this._restartButton.on("click", this._restartButtonClick, this);
            this.addChild(this._restartButton);
            if (!core.wonGame) {
                // add the restart level button
                this._restartLevelButton = new objects.Button("restartLevelButton", 320, 340, true);
                this._restartLevelButton.on("click", this._restartLevelButtonClick, this);
                this.addChild(this._restartLevelButton);
            }
            // add the exit button
            this._returnToMenuButton = new objects.Button("returnToMenuButton", 320, 440, true);
            this.addChild(this._returnToMenuButton);
            // Exit button event listener
            this._returnToMenuButton.on("click", this._returnToMenuButtonClick, this);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Over.prototype.update = function () {
            // scene updates happen here
            this._space.update();
            if ((createjs.Ticker.getTime() % 15) < 5) {
                this._gameOverLabel.alpha == 1 ? this._gameOverLabel.alpha = 0 : this._gameOverLabel.alpha = 1;
            }
        };
        // EVENT HANDLERS ++++++++++++++++
        Over.prototype._restartButtonClick = function (event) {
            // Switch the scene
            core.currentLives = core.gameStartingLives;
            core.score = 0;
            core.bulletsCollected = 0;
            core.robotCurrentLives = core.robotStartingLives;
            core.scene = config.Scene.PLAY;
            core.wonGame = false;
            core.changeScene();
        };
        Over.prototype._restartLevelButtonClick = function (event) {
            var currentLevel = core.play.levelNumber;
            core.score = core.levelStartingScore;
            if (currentLevel == config.Level.LEVEL_1) {
                core.currentLives = core.gameStartingLives;
            }
            else if (currentLevel == config.Level.LEVEL_2) {
                core.bulletsCollected = 0;
                core.currentGunBullets = 0;
                core.currentLives = core.levelStartingLives;
            }
            else if (currentLevel == config.Level.LEVEL_3) {
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
        };
        Over.prototype._returnToMenuButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.MENU;
            core.changeScene();
        };
        return Over;
    }(objects.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map