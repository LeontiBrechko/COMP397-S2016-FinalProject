/**
 * @filename: label.ts
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
     * This is a generic Label class
     * 
     * @export
     * @class Label
     * @extends {createjs.Text}
     */
    export class Label extends createjs.Text {
        constructor(private labelString:string,
                    private fontSize:string,
                    private fontFamily:string,
                    private fontColour:string,
                    x:number,
                    y:number,
                    isCentered?:boolean) {
            super(labelString, (fontSize + " " + fontFamily), fontColour);

            if (isCentered || typeof isCentered === 'undefined') {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }

            // assign label coordinates
            this.x = x;
            this.y = y;
        }
    }
}