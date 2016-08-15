/**
 * @filename: player.ts
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 15, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.3 - Version includes levels 1, 2, and 3
 */

module objects {
    /**
     * This is the Player object used in the game
     * 
     * @export
     * @class Player
     * @extends {createjs.Bitmap}
     */
    export class Player extends GameObject {
         // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Player.
         * 
         * @constructor
         * @param {string} imageString
         */
        constructor(imageString:string) {
            super(imageString);

            this.start();
        }

         /**
         * This method checks if the object has reached its boundaries
         * 
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        private _checkBounds():void {
            // checkbounds to stop player from going outside

            // check right bounds
            if(this.y >= (480 - (this.height * 0.5))) {
                this.y = (480 - (this.height * 0.5));
            }

            // check left bounds
             if (this.y <= this.height * 0.5) {
                 this.y = this.height * 0.5;
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
            this.x = 64;
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
            // player to follow mouse
            this.y = core.stage.mouseY;
            this._checkBounds();
            this.position.x = this.x;
            this.position.y = this.y;

        }

        public reset():void {
            
        }
    }
}