/**
 * @filename: enemy.ts
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 15, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.3 - Version includes levels 1, 2, and 3
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * This is the enemy object used in the game
     *
     * @export
     * @class Enemy
     * @extends {createjs.Bitmap}
     */
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        function Enemy(imageString, upperLeftBoundary, lowerRightBoundary) {
            _super.call(this, imageString);
            if (upperLeftBoundary.x >= lowerRightBoundary.x
                || upperLeftBoundary.y >= lowerRightBoundary.y)
                throw new DOMException();
            this._upperLeftBoundary = upperLeftBoundary;
            this._lowerRightBoundary = lowerRightBoundary;
            this.start();
        }
        Object.defineProperty(Enemy.prototype, "timeToFire", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._timeToFire;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object and sets the x and y locations
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        Enemy.prototype.reset = function () {
            this.x = this._lowerRightBoundary.x + this.width * 0.5;
            this.y = (this._upperLeftBoundary.y + this._lowerRightBoundary.y) * 0.5;
            this.position.x = this.x;
            this.position.y = this.y;
            this.dx = -5;
            this.dy = 0;
        };
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        Enemy.prototype._checkBounds = function () {
            if (this.x + this.width * 0.5 > this._lowerRightBoundary.x
                || this.x - this.width * 0.5 < this._upperLeftBoundary.x) {
                this.dx *= -1;
                this.x += this.dx;
            }
            if (this.y + this.height * 0.5 > this._lowerRightBoundary.y
                || this.y - this.height * 0.5 < this._upperLeftBoundary.y) {
                this.dy *= -1;
                this.y += this.dy;
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
        Enemy.prototype.start = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.reset();
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        Enemy.prototype.update = function () {
            if (this.x <= this._lowerRightBoundary.x - this.width * 0.5) {
                if (createjs.Ticker.getTime(true) % core.gameSpeed <= 19) {
                    this.dx = Math.floor(Math.random() * 10 - 5);
                    this.dy = Math.floor(Math.random() * 10 - 5);
                    this._timeToFire = Math.floor(Math.random() * 500 + 500);
                }
                this.x += this.dx;
                this.y += this.dy;
                this._checkBounds();
                this.position.x = this.x;
                this.position.y = this.y;
            }
            else {
                this.x += this.dx;
                this.position.x = this.x;
            }
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map