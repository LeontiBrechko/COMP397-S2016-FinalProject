var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Spaceman = (function (_super) {
        __extends(Spaceman, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        function Spaceman(imageString, upperLeftBoundary, lowerRightBoundary) {
            _super.call(this, imageString);
            if (upperLeftBoundary.x > lowerRightBoundary.x
                || upperLeftBoundary.y > lowerRightBoundary.y)
                throw new DOMException();
            this._upperLeftBoundary = upperLeftBoundary;
            this._lowerRightBoundary = lowerRightBoundary;
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object and sets the x and y locations
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        Spaceman.prototype._reset = function () {
            this.regX = this._lowerRightBoundary.x - this.halfWidth;
            this.regY = (this._upperLeftBoundary.y + this._lowerRightBoundary.y) / 2;
            this.position.x = this.x;
            this.position.y = this.y;
            this._dx = -5;
            this._dy = 0;
            this._timeToChangeDirection = 2000;
        };
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        Spaceman.prototype._checkBounds = function () {
            if (this.x + this.width >= this._lowerRightBoundary.x
                || this.x <= this._upperLeftBoundary.x)
                this._dx *= -1;
            if (this.y + this.height >= this._lowerRightBoundary.y
                || this.y <= this._upperLeftBoundary.y)
                this._dy *= -1;
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
        Spaceman.prototype.start = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this._reset();
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        Spaceman.prototype.update = function () {
            if (createjs.Ticker.getTime() % this._timeToChangeDirection == 0) {
                this._dx = Math.floor(Math.random() * 10 - 5);
                this._dy = Math.floor(Math.random() * 10 - 5);
            }
            this.x += this._dx;
            this.y += this._dy;
            this._checkBounds();
            this.position.x = this.x;
            this.position.y = this.y;
        };
        return Spaceman;
    }(objects.GameObject));
    objects.Spaceman = Spaceman;
})(objects || (objects = {}));
//# sourceMappingURL=spaceman.js.map