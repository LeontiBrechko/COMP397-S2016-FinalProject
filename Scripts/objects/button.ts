/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 8, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.2 - Version includes level 1 and 2
 */

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * This is the generic objects namespace
 * 
 * @module objects
 */
module objects {
    /**
     * This simple Button class extends the createjs.Bitmap object.
     * It includes two private methods to handle mouseover and mouseout events.
     * 
     * @export
     * @class Button
     * @extends {createjs.Bitmap}
     */
    export class Button extends createjs.Bitmap {

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Button.
         * 
         * @constructor 
         * @param {string} pathString
         * @param {number} x
         * @param {number} y
         * @param {boolean} isCentered
         */
        constructor(imageString: string, x:number, y:number, isCentered:boolean) {
            super(core.assets.getResult(imageString));

            // Check if user wants to change regX and regY values to the center 
            if(isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }

            this.x = x;
            this.y = y;

            // binds the mouseover and mouseout events to the button object
            this.on("mouseover", this._mouseOver, this);
            this.on("mouseout", this._mouseOut, this)
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        /**
         * This is an event handler for the mouseover event
         * 
         * @private
         * @method _mouseOver
         * @param {createjs.MouseEvent} event
         */
        private _mouseOver(event:createjs.MouseEvent):void {
            this.alpha = 0.7;
        }

        /**
         * This is an event handler for the mouseout event
         * 
         * @private
         * @method _mouseOut
         * @param {createjs.MouseEvent} event
         */
        private _mouseOut(event:createjs.MouseEvent):void {
            this.alpha = 1.0;
        }
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++