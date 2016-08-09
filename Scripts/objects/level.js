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
var objects;
(function (objects) {
    /**
     * This is abstract Level class for levels 1,2,3
     *
     * @export
     * @class Level
     * @extends {createjs.Bitmap}
     */
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.call(this);
            this.initializeLevel();
        }
        return Level;
    }(createjs.Container));
    objects.Level = Level;
})(objects || (objects = {}));
//# sourceMappingURL=level.js.map