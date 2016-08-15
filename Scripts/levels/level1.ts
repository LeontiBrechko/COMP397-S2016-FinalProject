/**
 * @filename: level1.ts
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 15, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.3 - Version includes levels 1, 2, and 3
 */

module levels {
    /**
     * This is the Level1 class for the level with ChargedClouds
     *
     * @export
     * @class Level1
     * @extends {createjs.Bitmap}
     */
    export class Level1 extends objects.Level {
        //  PRIVATE INSTANCE VARIABLES
        private _space:objects.Space;
        private _planet:objects.Planet;
        private _player:objects.Player;
        private _chargedClouds:objects.ChargedCloud[];
        private _collision:managers.Collision;
        private _scoreLabel:objects.Label;
        private _liveIcons:createjs.Bitmap[];

        constructor() {
            super();

            window.addEventListener("keydown", this._keyPressedEvent);
        }

        /**
         * This method updates score board of the level
         *
         * @private
         */
        private _updateScoreBoard() {
            for (let i = 0; i < this._liveIcons.length; i++)
                this._liveIcons[i].visible = true;

            for (let i = core.gameStartingLives - 1; i > Math.max(core.currentLives - 1, 0); i--) {
                this._liveIcons[i].visible = false;
            }
            this._scoreLabel.text = "Score: " + core.score;
        }

        /**
         * Entry point of the level
         */
        public initializeLevel():void {
            if (core.themeSound.playState != "playSucceeded")
                core.themeSound.play();
            core.levelStartingScore = 0;

            // ocean object
            this._space = new objects.Space("space");
            this.addChild(this._space);

            // island object
            this._planet = new objects.Planet("planet");
            this.addChild(this._planet);

            // player object
            this._player = new objects.Player("zombie");
            this.addChild(this._player);

            // charged cloud array
            this._chargedClouds = new Array<objects.ChargedCloud>();
            for (let i = 0; i < 3; i++) {
                this._chargedClouds.push(new objects.ChargedCloud("chargedCloud"));
                this.addChild(this._chargedClouds[i]);
            }

            // include a collision managers
            this._collision = new managers.Collision();

            // lives array
            this._liveIcons = new Array<createjs.Bitmap>();
            for (let i = 0; i < core.gameStartingLives; i++) {
                this._liveIcons.push(new createjs.Bitmap(core.assets.getResult("live")));
                this._liveIcons[i].x = 10 + i * this._liveIcons[0].getBounds().width;
                this._liveIcons[i].y = 5;
                this.addChild(this._liveIcons[i]);
            }

            // add core label
            this._scoreLabel = new objects.Label("Score: " + core.score, "40px", "BroadwayFont", "#7200ff", 450, 5, false);
            this._scoreLabel.textAlign = "center";
            this.addChild(this._scoreLabel);

            // add this scene to the global scene container
            core.stage.addChild(this);
        }

        /**
         * This method update level
         */
        public updateLevel():void {
            this._space.update();
            this._player.update();
            if (core.score < 800) {
                this._planet.update();
                this._collision.check(this._player, this._planet);

                this._chargedClouds.forEach(cloud => {
                    cloud.update();
                    this._collision.check(this._player, cloud);
                    this._chargedClouds.forEach(anotherCloud => {
                        if (anotherCloud != cloud &&
                            cloud.isColliding === anotherCloud.isColliding) {
                            this._collision.check(cloud, anotherCloud);
                        }
                    })
                });
            } else {
                if (this._planet.x > 0 - this._planet.width) {
                    this._planet.update();
                    this._collision.check(this._player, this._planet);
                } else {
                    this._planet.isActive = false;
                }

                this._chargedClouds.forEach(cloud => {
                    if (cloud.isActive && cloud.x > 0 - cloud.width) {
                        cloud.update();
                        this._collision.check(this._player, cloud);
                        this._chargedClouds.forEach(anotherCloud => {
                            if (anotherCloud != cloud &&
                                cloud.isColliding === anotherCloud.isColliding) {
                                this._collision.check(cloud, anotherCloud);
                            }
                        });
                    } else {
                        cloud.isActive = false;
                    }
                });

                if (!this._planet.isActive
                    && this._chargedClouds.filter(cloud => cloud.isActive).length === 0
                    && this._space.x == 0) {
                    core.play.levelNumber++;
                    core.play.ChangeLevel();
                }
            }

            this._updateScoreBoard();

            if (core.currentLives < 1) {
                createjs.Sound.stop();
                createjs.Sound.play("over");
                core.scene = config.Scene.OVER;
                core.changeScene();
            }
        }

        // EVENT HANDLERS ++++++++++++++++

        /**
         * This event handler handle all the cheats combinations
         *
         * @private
         * @param {KeyboardEvent} event
         */
        private _keyPressedEvent(event:KeyboardEvent):void {
            if (event.altKey) {

                switch (event.keyCode) {
                    case 49:
                        createjs.Sound.stop();
                        core.play.levelNumber = 0;
                        core.play.ChangeLevel();
                        break;
                    case 50:
                        createjs.Sound.stop();
                        core.play.levelNumber = 1;
                        core.play.ChangeLevel();
                        break;
                    case 51:
                        createjs.Sound.stop();
                        core.play.levelNumber = 2;
                        core.play.ChangeLevel();
                        break;
                }

            }
            else if (event.ctrlKey) {
                switch (event.keyCode) {
                    case 65:
                        createjs.Sound.play("cheat");
                        console.log(event.keyCode);
                        core.currentLives = 5;
                        break;
                }
            }
        }
    }
}