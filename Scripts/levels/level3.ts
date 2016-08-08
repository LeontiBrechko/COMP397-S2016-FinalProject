/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 1, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.1 - Initial version of Flying Dead
 */

module levels {
    export class Level3 extends objects.Level {
        //  PRIVATE INSTANCE VARIABLES
        private _stubLabel:objects.Label;
        private _stubGameOverButton:objects.Button;

        constructor() {
            super();
        }

        public InitializeLevel():void {
            // stub initialization
            this._stubLabel = new objects.Label("This is level 3 stub.", "40px", "Broadway", "#7200ff", 320, 140);
            this._stubGameOverButton = new objects.Button("gameOverStub", 320, 300, true);
            this._stubGameOverButton.on("click", this._gameOver, this);
            this.addChild(this._stubLabel);
            this.addChild(this._stubGameOverButton);

            // add this scene to the global scene container
            core.stage.addChild(this);
        }

        public UpdateLevel():void {
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