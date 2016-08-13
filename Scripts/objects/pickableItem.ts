/**
 * Created by Anton on 2016-08-08.
 */
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
     * This is the FuelBox pickable object used in the level 2
     *
     * @export
     * @class FuelBox
     * @extends {createjs.Bitmap}
     */
    export class PickableItem extends GameObject {
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++

        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++

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

         /**
         * Resets the object outside of the viewport
         * and sets the x and y locations
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        public reset():void {
            this.dx = -Math.floor((Math.random() * 5) + 7); // horizontal speed
            this.dy = -Math.floor((Math.random() * 4) - 2); // vertical drift
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
            this.y += this.dy;
            this.x += this.dx;
            this._checkBounds();
            this.position.x = this.x;
            this.position.y = this.y;
        }
    }
}