/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 8, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.2 - Version includes level 1 and 2
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * Creates an instance of Menu.
         *
         */
        function Menu() {
            _super.call(this);
        }
        /**
         *
         */
        Menu.prototype.start = function () {
            this._space = new objects.Space("space");
            this.addChild(this._space);
            // Add Menu Label
            this._menuLabel = new objects.Label("FLYING DEAD", "80px", "BroadwayFont", "#7200ff", 320, 140, true);
            this.addChild(this._menuLabel);
            // add the start button
            this._startButton = new objects.Button("startButton", 320, 340, true);
            this.addChild(this._startButton);
            // start button event listener
            this._startButton.on("click", this._startButtonClick, this);
            // add the exit button
            this._exitButton = new objects.Button("exitButton", 320, 440, true);
            this.addChild(this._exitButton);
            // Exit button event listener
            this._exitButton.on("click", this._exitButtonClick, this);
            // add instructions button
            this._instructionsButton = new objects.Button("instructionsButton", 320, 390, true);
            this.addChild(this._instructionsButton);
            // Instructions button event listener
            this._instructionsButton.on("click", this._instructionsButtonClick, this);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Menu.prototype.update = function () {
            this._space.update();
            if ((createjs.Ticker.getTime() % 10) < 5) {
                this._menuLabel.alpha == 1 ? this._menuLabel.alpha = 0 : this._menuLabel.alpha = 1;
            }
            // scene updates happen here...
        };
        // EVENT HANDLERS ++++++++++++++++
        Menu.prototype._startButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.PLAY;
            core.changeScene();
        };
        Menu.prototype._instructionsButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.INSTRUCTIONS;
            core.changeScene();
        };
        Menu.prototype._exitButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.EXIT;
            core.changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map