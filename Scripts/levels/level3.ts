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

module levels {
    /**
     * This is the Level3 class for the level with Boss
     * 
     * @export
     * @class Level3
     * @extends {createjs.Bitmap}
     */
    export class Level3 extends objects.Level {
        //  PRIVATE INSTANCE VARIABLES
        private _stubLabel:objects.Label;
        private _stubGameOverButton:objects.Button;

        constructor() {
            super();
        }

        public initializeLevel():void {
            // stub initialization
            this._stubLabel = new objects.Label("This is level 3 stub.", "40px", "BroadwayFont", "#7200ff", 320, 140);
            this._stubGameOverButton = new objects.Button("gameOverStub", 320, 300, true);
            this._stubGameOverButton.on("click", this._gameOver, this);
            this.addChild(this._stubLabel);
            this.addChild(this._stubGameOverButton);

            // add this scene to the global scene container
            core.stage.addChild(this);
        }

        public updateLevel():void {
        }

        // EVENT HANDLERS ++++++++++++++++
        /**
         * Simulates game over for this level
         *
         * @param event
         * @private
         */
        private _gameOver(event: createjs.MouseEvent): void {
            createjs.Sound.stop();
            createjs.Sound.play("over");
            core.scene = config.Scene.OVER;
            core.changeScene();
        }
    }
}