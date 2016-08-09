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
     * This is the Planet object used in the game
     * 
     * @export
     * @class Planet
     * @extends {createjs.Bitmap}
     */
    export class Planet extends GameObject {
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        // PUBLIC PROPERTIES
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Planet.
         * 
         * @constructor
         * @param {string} imageString
         */
        constructor(imageString: string) {
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
        public reset():void {
            this.y = Math.floor((Math.random() * (480 - (this.width * 1))) + (this.width * 0.5));

            // get a random x location
            this.x = 640+this.width;
        }

        /**
         * This method checks if the object has reached its boundaries
         * 
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        private _checkBounds():void {
            if(this.x <=(0-this.width)) {
                // TODO: change to asset load
                (<HTMLImageElement> this.image).src = "Assets/images/planet.png";
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
            this.dx = -5; // 5px per frame down
            // TODO: change to asset load
            (<HTMLImageElement> this.image).src = "Assets/images/planet.png";
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
            this.x += this.dx;
            this._checkBounds();
            this.position.x = this.x;
            this.position.y = this.y;
        }
    }
}