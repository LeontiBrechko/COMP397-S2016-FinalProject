/// <reference path="../core/game.ts"/>
/**
 * @filename: scene.ts
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
     * This abstract scene class is used to create individual scenes
     * 
     * @export
     * @abstract
     * @class Scene
     * @extends {createjs.Container}
     */
    export abstract class Scene extends createjs.Container {
        constructor() {
            super();
            this.start();
        }

        /**
         * Add game objects to the scene in this method
         * 
         * @method start
         * @returns {void}
         */
        public start():void {
            core.stage.addChild(this);
        }

        /**
         * Updates Game objects in the Scene
         * 
         * @method update
         * @returns {void} 
         */
        public update():void {

        }
    }
}