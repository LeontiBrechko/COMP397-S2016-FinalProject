/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 1, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.1 - Initial version of Flying Dead
 */

module objects {
    /**
     * This is the ChargedCloud object used in the game
     *
     * @export
     * @class ChargedCloud
     * @extends {createjs.Bitmap}
     */
    export class ChargedCloud extends GameObject {
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private _dy:number;
        private _dx:number;

        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++
        get dy():number {
            return this._dy;
        }

        set dy(newDy:number) {
            this._dy = newDy;
        }

        get dx():number {
            return this._dx;
        }

        set dx(newDx:number) {
            this._dx = newDx;
        }

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of ChargedCloud.
         *
         * @constructor
         * @param {string} imageString
         */
        constructor(imageString:string) {
            super(imageString);

            this.start();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         * and sets the x and y locations
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        

        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        private _checkBounds():void {
            if (this.x <= (0 - this.width)) {
                this.reset();
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

        public reset():void {
            this._dx = -Math.floor((Math.random() * 5) + 5); // horizontal speed
            this._dy = -Math.floor((Math.random() * 4) - 2); // vertical drift
            this.rotation = Math.floor(Math.random()*360);
            // get a random y location
            this.y = Math.floor((Math.random() * (480 - (this.width * 0.5))) + (this.width * 0.5));

            this.x = 640 + this.width;
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
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
            this.position.x = this.x;
            this.position.y = this.y;
            this.alpha ==1?this.alpha=0:this.alpha=1;
        }
    }
}