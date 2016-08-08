module objects {
    export class Spaceman extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private _upperLeftBoundary:Vector2;
        private _lowerRightBoundary:Vector2;
        private _dx:number;
        private _dy:number;
        private _timeToChangeDirection:number;

        // PUBLIC PROPERTIES
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++

        constructor(imageString:string, upperLeftBoundary:Vector2, lowerRightBoundary:Vector2) {
            super(imageString);

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
        private _reset():void {
            this.regX = this._lowerRightBoundary.x - this.halfWidth;
            this.regY = (this._upperLeftBoundary.y + this._lowerRightBoundary.y) / 2;
            this.position.x = this.x;
            this.position.y = this.y;
            this._dx = -5;
            this._dy = 0;
            this._timeToChangeDirection = 2000;
        }

        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        private _checkBounds():void {
            if (this.x + this.width >= this._lowerRightBoundary.x
                || this.x <= this._upperLeftBoundary.x)
                this._dx *= -1;
            if (this.y + this.height >= this._lowerRightBoundary.y
                || this.y <= this._upperLeftBoundary.y)
                this._dy *= -1;
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++

        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        public start():void {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this._reset();
        }

        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        public update():void {
            if (createjs.Ticker.getTime() % this._timeToChangeDirection == 0) {
                this._dx = Math.floor(Math.random() * 10 - 5);
                this._dy = Math.floor(Math.random() * 10 - 5);
            }
            this.x += this._dx;
            this.y += this._dy;
            this._checkBounds();
            this.position.x = this.x;
            this.position.y = this.y;
        }
    }
}