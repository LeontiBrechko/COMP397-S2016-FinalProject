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
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
        }
        Object.defineProperty(Play.prototype, "levelNumber", {
            get: function () {
                return this._levelNumber;
            },
            set: function (newLevel) {
                this._levelNumber = newLevel;
            },
            enumerable: true,
            configurable: true
        });
        Play.prototype.Start = function () {
            // start with the first level
            this._levelNumber = config.Level.LEVEL_1;
            this._currentLevel = new levels.Level1();
        };
        Play.prototype.Update = function () {
            this._currentLevel.UpdateLevel();
        };
        Play.prototype.ChangeLevel = function () {
            //Launch Various Levels
            switch (this._levelNumber) {
                // Show LEVEL 1
                case config.Level.LEVEL_1:
                    this._currentLevel.removeAllChildren();
                    this._currentLevel = new levels.Level1();
                    break;
                case config.Level.LEVEL_2:
                    this._currentLevel.removeAllChildren();
                    this._currentLevel = new levels.Level2();
                    break;
                case config.Level.LEVEL_3:
                    this._currentLevel.removeAllChildren();
                    this._currentLevel = new levels.Level3();
                    break;
            }
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map