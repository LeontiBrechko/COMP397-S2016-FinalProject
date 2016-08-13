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
    var Exit = (function (_super) {
        __extends(Exit, _super);
        /**
         * Creates an instance of Instructions scene.
         *
         */
        function Exit() {
            _super.call(this);
        }
        /**
         *
         */
        Exit.prototype.start = function () {
            this._space = new objects.Space("space");
            this.addChild(this._space);
            //add the Thank You label
            this._thankYouLabel = new objects.Label("THANK YOU FOR PLAYING!", "40px", "BroadwayFont", "#7200ff", 320, 240, true);
            this.addChild(this._thankYouLabel);
            core.stage.addChild(this);
        };
        Exit.prototype.update = function () {
            this._space.update();
            this._thankYouLabel.alpha == 1 ? this._thankYouLabel.alpha = 0 : this._thankYouLabel.alpha = 1;
            // scene updates happen here...
        };
        return Exit;
    }(objects.Scene));
    scenes.Exit = Exit;
})(scenes || (scenes = {}));
//# sourceMappingURL=exit.js.map