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
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        /**
         * Creates an instance of Instructions scene.
         *
         */
        function Instructions() {
            _super.call(this);
        }
        /**
         *
         */
        Instructions.prototype.start = function () {
            var gameInstructions = [];
            var instructionsArray = [
                "You are a Zombie, infecting planets.",
                "Fly over the planet and infect it",
                "but be careful not to fly",
                "too close to the charged clouds. Your jetpack",
                "will be destroyed if cloud charge gets into it",
                "too many times. Steer with the mouse.",
                "May the dexterity be with you!"
            ];
            this._space = new objects.Space("space");
            this.addChild(this._space);
            for (var line = 0; line < instructionsArray.length; line++) {
                gameInstructions[line] = new createjs.Text(instructionsArray[line], "BroadwayFont");
                gameInstructions[line].x = 10;
                gameInstructions[line].y = 20 + (2 * line);
                this.addChild(new objects.Label(instructionsArray[line], "22px", "BroadwayFont", "#7200ff", 300, 40 * line + 40, true));
            }
            // Add Menu Label
            this.addChild(this._instructionsLabel);
            // add the start button
            this._startButton = new objects.Button("startButton", 320, 340, true);
            this.addChild(this._startButton);
            this._returnButton = new objects.Button("returnButton", 320, 390, true);
            this.addChild(this._returnButton);
            // start button event listener
            this._startButton.on("click", this._startButtonClick, this);
            this._returnButton.on("click", this._returnButtonClick, this);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Instructions.prototype.update = function () {
            this._space.update();
            // scene updates happen here...
        };
        // EVENT HANDLERS ++++++++++++++++
        Instructions.prototype._startButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.PLAY;
            core.changeScene();
        };
        Instructions.prototype._returnButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.MENU;
            core.changeScene();
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map