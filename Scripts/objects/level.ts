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
     * This is abstract Level class for levels 1,2,3
     * 
     * @export
     * @class Level
     * @extends {createjs.Bitmap}
     */
    export abstract class Level extends createjs.Container {
        constructor() {
            super();

            this.initializeLevel();
        }

        public abstract initializeLevel():void;

        public abstract updateLevel():void;
    }
}