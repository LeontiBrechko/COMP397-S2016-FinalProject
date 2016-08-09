/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 8, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.2 - Version includes level 1 and 2
 */

module scenes {
    export class Menu extends objects.Scene {
        //  PRIVATE INSTANCE VARIABLES
        private _space: objects.Space;
        private _menuLabel: objects.Label;
        private _startButton: objects.Button;
        private _instructionsButton: objects.Button;
        private _exitButton: objects.Button;
        /**
         * Creates an instance of Menu.
         *
         */
        constructor() {
            super();
        }

        /**
         *
         */
        public start(): void {
            this._space = new objects.Space("space");
            this.addChild(this._space);

            // Add Menu Label
            this._menuLabel = new objects.Label(
                "FLYING DEAD", "80px", "BroadwayFont", "#7200ff",
                315, 140
            );
            this.addChild(this._menuLabel);

            // add the start button
            this._startButton = new objects.Button(
                "startButton", 320, 340, true
            );
            this.addChild(this._startButton);

            // start button event listener
            this._startButton.on("click", this._startButtonClick, this);

            // add the exit button
            this._exitButton = new objects.Button(
                "exitButton", 320, 440, true
            );
            this.addChild(this._exitButton);

            // Exit button event listener
            this._exitButton.on("click", this._exitButtonClick, this);


            // add instructions button
            this._instructionsButton = new objects.Button("instructionsButton", 320, 390, true);
            this.addChild(this._instructionsButton);

            // Instructions button event listener
            this._instructionsButton.on("click", this._instructionsButtonClick, this);

            // add this scene to the global scene container
            core.stage.addChild(this);
        }

        public update(): void {
            this._space.update();
            this._menuLabel.alpha == 1 ? this._menuLabel.alpha = 0 : this._menuLabel.alpha = 1;
            // scene updates happen here...
        }

        // EVENT HANDLERS ++++++++++++++++

        private _startButtonClick(event: createjs.MouseEvent): void {
            // Switch the scene
            core.scene = config.Scene.PLAY;
            core.changeScene();
        }

        private _instructionsButtonClick(event: createjs.MouseEvent): void {
            // Switch the scene
            core.scene = config.Scene.INSTRUCTIONS;
            core.changeScene();
        }

        private _exitButtonClick(event: createjs.MouseEvent): void {
            // Switch the scene
            core.scene = config.Scene.EXIT;
            core.changeScene();
        }
    }
}