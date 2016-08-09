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
    export abstract class Level extends createjs.Container {
        constructor() {
            super();

            this.initializeLevel();
        }

        public abstract initializeLevel():void;

        public abstract updateLevel():void;
    }
}