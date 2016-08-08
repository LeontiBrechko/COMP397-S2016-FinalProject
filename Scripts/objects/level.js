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
var objects;
(function (objects) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.call(this);
            this.InitializeLevel();
        }
        return Level;
    }(createjs.Container));
    objects.Level = Level;
})(objects || (objects = {}));
//# sourceMappingURL=level.js.map