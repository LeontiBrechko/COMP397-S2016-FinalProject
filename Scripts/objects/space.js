var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @filename: space.ts
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 15, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.3 - Version includes levels 1, 2, and 3
 */
var objects;
(function (objects) {
    /**
     * This is the Space object used in the game
     *
     * @export
     * @class Space
     * @extends {createjs.Bitmap}
     */
    var Space = (function (_super) {
        __extends(Space, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Space.
         *
         * @constructor
         * @param {string} imageString
         */
        function Space(imageString) {
            _super.call(this, core.assets.getResult(imageString));
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        Space.prototype._reset = function () {
            this.x = 0;
        };
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        Space.prototype._checkBounds = function () {
            if (this.x <= -1280) {
                this._reset();
            }
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        Space.prototype.start = function () {
            this._reset();
            this._dx = -5; // 5px per frame down
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        Space.prototype.update = function () {
            this.x += this._dx;
            this._checkBounds();
        };
        return Space;
    }(createjs.Bitmap));
    objects.Space = Space;
})(objects || (objects = {}));
//# sourceMappingURL=space.js.map