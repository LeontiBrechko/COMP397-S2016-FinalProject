/**
 * @filename: level2.ts
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
     * This is the Level1 class for the level with Enemies, fuelBoxes, and gunBoxes
     * 
     * @export
     * @class Level1
     * @extends {createjs.Bitmap}
     */
    export class Level2 extends objects.Level {
        //  PRIVATE INSTANCE VARIABLES
        private _space:objects.Space;
        private _player:objects.Player;
        private _fuelBoxes:objects.PickableItem[];
        private _gunBoxes:objects.PickableItem[];
        private _spacemen:objects.Enemy[];
        private _bullets:objects.Bullet[];
        private _collision:managers.Collision;
        private _fuelLevelLabel:objects.Label;
        private _bulletLabel:objects.Label;
        private _liveIcons:createjs.Bitmap[];
        private _levelProgress:createjs.Bitmap;
        private _playerIcon:createjs.Bitmap;
        private _levelTotalTime:number;
        private _levelStartTime:number;

        constructor() {
            super();
            window.addEventListener("keydown", this._keyPressedEvent);
        }

        /**
         * This method updates Score board
         * 
         * @private
         */
        private _updateScoreBoard() {
            for (let i = 0; i < this._liveIcons.length; i++)
                this._liveIcons[i].visible = true;
                
            for (let i = core.gameStartingLives - 1; i > Math.max(0, core.currentLives - 1); i--) {
                this._liveIcons[i].visible = false;
            }
            this._fuelLevelLabel.text = "Fuel Level:" + core.fuelLevel + "/5";
            this._bulletLabel.text = "Bullets:" + core.currentGunBullets;
        }
        
        public initializeLevel():void {
            this._levelTotalTime = 15000;
            core.levelStartingScore = core.score;
            core.levelStartingLives = core.currentLives;
            core.fuelLevel = 5;
            if (core.themeSound.playState != "playSucceeded")
                core.themeSound.play();

            // space object
            this._space = new objects.Space("space");
            this.addChild(this._space);

            // player object
            this._player = new objects.Player("zombie");
            this.addChild(this._player);

            // fuel box array
            this._fuelBoxes = new Array<objects.PickableItem>();
            for (let i = 0; i < 2; i++) {
                this._fuelBoxes.push(new objects.PickableItem("fuelBox"));
                this.addChild(this._fuelBoxes[i]);
            }

            // gun box array
            this._gunBoxes = new Array<objects.PickableItem>();
            for (let i = 0; i < 2; i++) {
                this._gunBoxes.push(new objects.PickableItem("gunBox"));
                this.addChild(this._gunBoxes[i]);
            }

            // spaceman array
            this._spacemen = new Array<objects.Enemy>();
            for (let i = 0; i < 2; i++) {
                this._spacemen.push(
                    new objects.Enemy("spaceman",
                        new createjs.Point(400, i * 240),
                        new createjs.Point(640, (i + 1) * 240)));
                this.addChild(this._spacemen[i]);
            }

            // bullet array
            this._bullets = new Array<objects.Bullet>();
            for (let i = 0; i < 10; i++) {
                this._bullets.push(new objects.Bullet("bullet"));
                this.addChild(this._bullets[i]);
            }
            
            // include a collision managers
            this._collision = new managers.Collision();

            this._fuelLevelLabel =
                new objects.Label("Fuel Level: " + core.fuelLevel + "/5",
                    "40px", "BroadwayFont", "#7200ff", 620, 5, false);
            this._fuelLevelLabel.textAlign = "right";
            this.addChild(this._fuelLevelLabel);

            this._bulletLabel =
                new objects.Label("Bullets: " + core.currentGunBullets,
                    "40px", "BroadwayFont", "#7200ff", 620, 35, false);
            this._bulletLabel.textAlign = "right";
            this.addChild(this._bulletLabel);

            // lives array
            this._liveIcons = new Array<createjs.Bitmap>();
            for (let i = 0; i < core.gameStartingLives; i++) {
                this._liveIcons.push(new createjs.Bitmap(core.assets.getResult("live")));
                this._liveIcons[i].x = 10 + i * this._liveIcons[0].getBounds().width;
                this._liveIcons[i].y = 5;
                this.addChild(this._liveIcons[i]);
            }

            // level progress bar
            this._levelProgress = new createjs.Bitmap(core.assets.getResult("levelProgress"));
            this._levelProgress.x = 10;
            this._levelProgress.y = 454;
            this.addChild(this._levelProgress);

            // player icon on progress bar
            this._playerIcon = new createjs.Bitmap(core.assets.getResult("zombieIcon"));
            this._playerIcon.x = 10;
            this._playerIcon.y = 455;
            this.addChild(this._playerIcon);

            // add this scene to the global scene container
            core.stage.addChild(this);

            this._levelStartTime = createjs.Ticker.getTime();
        }

        public updateLevel():void {
            this._space.update();
            this._player.update();

            this._fuelBoxes.forEach(fuelBox => {
                fuelBox.update();
                this._collision.check(this._player, fuelBox);
                this._fuelBoxes.forEach(anotherFuelBox => {
                    if (anotherFuelBox != fuelBox &&
                        fuelBox.isColliding === anotherFuelBox.isColliding) {
                        this._collision.check(fuelBox, anotherFuelBox);
                    }
                });
                this._gunBoxes.forEach(gunBox => {
                    if (fuelBox.isColliding === gunBox.isColliding) {
                        this._collision.check(fuelBox, gunBox);
                    }
                });
            });

            this._gunBoxes.forEach(gunBox => {
                gunBox.update();
                this._collision.check(this._player, gunBox);
                this._gunBoxes.forEach(anotherGunBox => {
                    if (anotherGunBox != gunBox &&
                        gunBox.isColliding === anotherGunBox.isColliding) {
                        this._collision.check(gunBox, anotherGunBox);
                    }
                });
            });

            this._spacemen.forEach(spaceman => {
                spaceman.update();
                if (createjs.Ticker.getTime() % spaceman.timeToFire <= 19) {
                    for (let bullet in this._bullets) {
                        if (!this._bullets[bullet].inFlight) {
                            this._bullets[bullet].fire(
                                new objects.Vector2(spaceman.position.x, spaceman.position.y)
                            );
                            break;
                        }
                    }
                }
            });

            this._bullets.forEach(bullet => {
                bullet.update();
                if (bullet.inFlight) {
                    this._collision.check(this._player, bullet);
                }
            });

            this._updateScoreBoard();

            if (core.currentLives < 1 || core.fuelLevel < 1) {
                createjs.Sound.stop();
                createjs.Sound.play("over");
                core.scene = config.Scene.OVER;
                core.changeScene();
            }

            // updating fuel level
            if (createjs.Ticker.getTime() % core.gameSpeed <= 19) {
                if (core.fuelLevel > 0)
                    core.fuelLevel--;
            }

            if (createjs.Ticker.getTime() - this._levelStartTime <= this._levelTotalTime) {
                this._playerIcon.x = 10 +
                    (createjs.Ticker.getTime() - this._levelStartTime) / this._levelTotalTime
                    * (620 - this._playerIcon.getBounds().width);
            } else {
                createjs.Sound.stop();
                core.play.levelNumber++;
                core.play.ChangeLevel();
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