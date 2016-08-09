/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 8, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.2 - Version includes level 1 and 2
 */

module objects {
    /**
     * This is the enemy object used in the game
     * 
     * @export
     * @class Spaceman
     * @extends {createjs.Bitmap}
     */
    export class Spaceman extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private _upperLeftBoundary:createjs.Point;
        private _lowerRightBoundary:createjs.Point;
        private _timeToFire:number;

        // PUBLIC PROPERTIES
        
        get timeToFire():number {
            return this._timeToFire;
        }
        
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++

        constructor(imageString:string, upperLeftBoundary:createjs.Point, lowerRightBoundary:createjs.Point) {
            super(imageString);

            if (upperLeftBoundary.x >= lowerRightBoundary.x
                || upperLeftBoundary.y >= lowerRightBoundary.y)
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
        public reset():void {
            this.x = this._lowerRightBoundary.x + this.width * 0.5;
            this.y = (this._upperLeftBoundary.y + this._lowerRightBoundary.y) * 0.5;
            this.position.x = this.x;
            this.position.y = this.y;
            this.dx = -5;
            this.dy = 0;
        }

        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        private _checkBounds():void {
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
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.reset();
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
            } else {
                this.x += this.dx;
                this.position.x = this.x;
            }
        }
    }
}