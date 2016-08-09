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
    export class Level2 extends objects.Level {
        //  PRIVATE INSTANCE VARIABLES
        private _space:objects.Space;
        private _player:objects.Player;
        private _fuelBoxes:objects.FuelBox[];
        private _gunBoxes:objects.GunBox[];
         private _spacemen:objects.Spaceman[];
        private _bullets:objects.Bullet[];
        private _collision:managers.Collision;
        private _fuelLevelLabel:objects.Label;
        private _bulletLabel:objects.Label;
        private _liveIcons:createjs.Bitmap[];
        private _themeSound:createjs.AbstractSoundInstance;
        //stub button
        private _stubNextLevelButton:objects.Button;
        private _levelTimer:number;

        constructor() {
            super();
        }

        private _updateScoreBoard() {
            for (let i = core.startingLives - 1; i > core.currentLives - 1; i--) {
                this._liveIcons[i].visible = false;
            }
            this._fuelLevelLabel.text = "Fuel Level:" + core.fuelLevel + "/5";
            this._bulletLabel.text = "Bullets:" + core.gunBullets;
        }
        
        public initializeLevel():void {
            this._levelTimer = 0;
            core.currentLives = 1;
            core.fuelLevel = 5;

            // space object
            this._space = new objects.Space("space");
            this.addChild(this._space);

            // player object
            this._player = new objects.Player("zombie");
            this.addChild(this._player);
            this._themeSound = createjs.Sound.play("main_theme");
            this._themeSound.loop = -1;

            // fuel box array
            this._fuelBoxes = new Array<objects.FuelBox>();
            for (let i = 0; i < 2; i++) {
                this._fuelBoxes.push(new objects.FuelBox("fuelBox"));
                this.addChild(this._fuelBoxes[i]);
            }

            // gun box array
            this._gunBoxes = new Array<objects.GunBox>();
            for (let i = 0; i < 2; i++) {
                this._gunBoxes.push(new objects.GunBox("gunBox"));
                this.addChild(this._gunBoxes[i]);
            }

            // spaceman array
            this._spacemen = new Array<objects.Spaceman>();
            for (let i = 0; i < 2; i++) {
                this._spacemen.push(
                    new objects.Spaceman("spaceman",
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
                new objects.Label("Fuel Level: " + core.gunBullets,
                    "40px", "BroadwayFont", "#7200ff", 620, 35, false);
            this._bulletLabel.textAlign = "right";
            this.addChild(this._bulletLabel);

            // lives array
            this._liveIcons = new Array<createjs.Bitmap>();
            for (let i = 0; i < core.startingLives; i++) {
                this._liveIcons.push(new createjs.Bitmap(core.assets.getResult("live")));
                this._liveIcons[i].x = 10 + i * this._liveIcons[0].getBounds().width;
                this._liveIcons[i].y = 5;
                this.addChild(this._liveIcons[i]);
            }

            // add stub next level button
            this._stubNextLevelButton = new objects.Button("nextLevelStub", 320, 440, true);
            this._stubNextLevelButton.on("click", this._nextLevel, this);
            this.addChild(this._stubNextLevelButton);

            // add this scene to the global scene container
            core.stage.addChild(this);
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
                            this._bullets[bullet].fire(spaceman.position);
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

            // stub test on score
            if (core.score >= 500) {
                createjs.Sound.stop();
                core.play.levelNumber++;
                core.play.ChangeLevel();
            }

            if (createjs.Ticker.getTime(true) % core.gameSpeed <= 19) {
                if (core.fuelLevel > 0)
                    core.fuelLevel--;
            }

            if (this._levelTimer >= 600) {
                this._levelTimer = 0;
                console.log("level 2 is done");
                createjs.Sound.stop();
                core.play.levelNumber++;
                core.play.ChangeLevel();
            }
            this._levelTimer++;
        }

        // EVENT HANDLERS ++++++++++++++++
        /**
         * Simulates next level continuation
         *
         * @param event
         * @private
         */
        private _nextLevel(event:createjs.MouseEvent):void {
            createjs.Sound.stop();
            core.play.levelNumber++;
            core.play.ChangeLevel();
        }
    }
}