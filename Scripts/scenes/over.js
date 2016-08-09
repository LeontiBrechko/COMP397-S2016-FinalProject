/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 1, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.1 - Initial version of Flying Dead
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
            // Add Menu Label
            this._gameOverLabel = new objects.Label("GAME OVER", "40px", "BroadwayFont", "#7200ff", 320, 140, true);
            this.addChild(this._gameOverLabel);
            this._finalScoreLabel = new objects.Label("FINAL SCORE: " + core.score, "40px", "BroadwayFont", "#7200ff", 320, 240, true);
            this.addChild(this._finalScoreLabel);
            // add the restart button
            this._restartButton = new objects.Button("restartButton", 320, 390, true);
            this._restartButton.on("click", this._restartButtonClick, this);
            this.addChild(this._restartButton);
            // add the restart level button
            this._restartLevelButton = new objects.Button("restartLevelButton", 320, 340, true);
            this._restartLevelButton.on("click", this._restartLevelButtonClick, this);
            this.addChild(this._restartLevelButton);
            // add the exit button
            this._exitButton = new objects.Button("exitButton", 320, 440, true);
            this.addChild(this._exitButton);
            // Exit button event listener
            this._exitButton.on("click", this._exitButtonClick, this);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Over.prototype.update = function () {
            this._space.update();
            this._gameOverLabel.alpha == 1 ? this._gameOverLabel.alpha = 0 : this._gameOverLabel.alpha = 1;
            // scene updates happen here...
        };
        // EVENT HANDLERS ++++++++++++++++
        Over.prototype._restartButtonClick = function (event) {
            // Switch the scene
            core.currentLives = core.startingLives;
            core.score = 0;
            core.scene = config.Scene.PLAY;
            core.changeScene();
        };
        Over.prototype._restartLevelButtonClick = function (event) {
            var currentLevel = core.play.levelNumber;
            core.currentLives = core.startingLives;
            core.score = 0;
            core.scene = config.Scene.PLAY;
            core.changeScene();
            core.play.levelNumber = currentLevel;
            createjs.Sound.stop();
            core.play.ChangeLevel();
        };
        Over.prototype._exitButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.EXIT;
            core.changeScene();
        };
        return Over;
    }(objects.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map