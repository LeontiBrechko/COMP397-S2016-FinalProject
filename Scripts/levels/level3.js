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
var levels;
(function (levels) {
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            _super.call(this);
        }
        Level3.prototype.initializeLevel = function () {
            // stub initialization
            this._stubLabel = new objects.Label("This is level 3 stub.", "40px", "BroadwayFont", "#7200ff", 320, 140);
            this._stubGameOverButton = new objects.Button("gameOverStub", 320, 300, true);
            this._stubGameOverButton.on("click", this._gameOver, this);
            this.addChild(this._stubLabel);
            this.addChild(this._stubGameOverButton);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Level3.prototype.updateLevel = function () {
        };
        // EVENT HANDLERS ++++++++++++++++
        /**
         * Simulates game over for this level
         *
         * @param event
         * @private
         */
        Level3.prototype._gameOver = function (event) {
            createjs.Sound.stop();
            createjs.Sound.play("over");
            core.scene = config.Scene.OVER;
            core.changeScene();
        };
        return Level3;
    }(objects.Level));
    levels.Level3 = Level3;
})(levels || (levels = {}));
//# sourceMappingURL=level3.js.map