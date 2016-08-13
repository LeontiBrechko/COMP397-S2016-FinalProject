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
     * This is the Bullet object used in the level 2 by enemies
     *
     * @export
     * @class Bullet
     * @extends {createjs.Bitmap}
     */
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        function Bullet(imageString) {
            _super.call(this, imageString);
            this.alpha = 0.4;
            this.start();
        }
        Object.defineProperty(Bullet.prototype, "inFlight", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._inFlight;
            },
            set: function (newState) {
                this._inFlight = newState;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Bullet.prototype.reset = function () {
            this.position = this._defaultPosition;
            this.x = this.position.x;
            this.y = this.position.y;
            this.inFlight = false;
            this.dy = 0;
        };
        Bullet.prototype._checkBounds = function () {
            if (this.position.x <= -this.width) {
                this.reset();
            }
        };
        // PUBLIC METHODS
        Bullet.prototype.fire = function (newPosition) {
            this.x = newPosition.x;
            this.y = newPosition.y;
            this.position = newPosition;
            this.inFlight = true;
            createjs.Sound.play("pew");
        };
        Bullet.prototype.start = function () {
            this._defaultPosition = new objects.Vector2(1000, 1000);
            this.dx = -10;
            this.reset();
        };
        Bullet.prototype.update = function () {
            if (this.inFlight) {
                this.x += this.dx;
                this.y += this.dy;
                this.position.x = this.x;
                this.position.y = this.y;
                this._checkBounds();
            }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map