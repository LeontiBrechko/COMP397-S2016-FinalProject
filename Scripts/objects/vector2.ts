/**
 * @filename: vector2.ts
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
     * This class extends the CreateJS Point class
     *
     * @export
     * @class Vector2
     * @extends {createjs.Point}
     */
    export class Vector2 extends createjs.Point {
        constructor(x:number = 0, y:number = 0) {
            super(x, y);
        }

        /**
         * This method returns the distance between two Vector2 objects (a and b)
         *
         * @static
         * @method distance
         * @param {Vector2} a
         * @param {Vector2} b
         * @returns {number}
         */
        public static distance(a:Vector2, b:Vector2):number {
            return Math.floor(Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2)));
        }
    }
}