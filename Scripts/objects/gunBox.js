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
    /**
     * This is the ChargedCloud object used in the game
     *
     * @export
     * @class ChargedCloud
     * @extends {createjs.Bitmap}
     */
    var GunBox = (function (_super) {
        __extends(GunBox, _super);
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of ChargedCloud.
         *
         * @constructor
         * @param {string} imageString
         */
        function GunBox(imageString) {
            _super.call(this, imageString);
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        GunBox.prototype._checkBounds = function () {
            if (this.x <= (0 - this.width)) {
                this.reset();
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
        GunBox.prototype.start = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.reset();
        };
        /**
        * Resets the object outside of the viewport
        * and sets the x and y locations
        *
        * @private
        * @method _reset
        * @returns {void}
        */
        GunBox.prototype.reset = function () {
            this.dx = -Math.floor((Math.random() * 5) + 7); // horizontal speed
            this.dy = -Math.floor((Math.random() * 4) - 2); // vertical drift
            // get a random y location
            this.y = Math.floor((Math.random() * (480 - (this.width * 0.5))) + (this.width * 0.5));
            this.x = 640 + this.width;
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        GunBox.prototype.update = function () {
            this.y += this.dy;
            this.x += this.dx;
            this._checkBounds();
            this.position.x = this.x;
            this.position.y = this.y;
        };
        return GunBox;
    }(objects.GameObject));
    objects.GunBox = GunBox;
})(objects || (objects = {}));
//# sourceMappingURL=gunBox.js.map