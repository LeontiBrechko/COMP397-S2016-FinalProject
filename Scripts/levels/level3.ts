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
        private _space:objects.Space;
        private _player:objects.Player;
        private _liveBoxes:objects.PickableItem[];
        private _gunBoxes:objects.PickableItem[];
        private _robot:objects.Spaceman;
        private _bullets:objects.Bullet[];
        private _collision:managers.Collision;
        private _liveIcons:createjs.Bitmap[];
        private _robotLiveIcons:createjs.Bitmap[];
        private _bulletLabel:objects.Label;
        private _levelTotalTime:number;
        private _levelStartTime:number;

        constructor() {
            super();
            this.on("click", this._shoot);
        }

        private _updateScoreBoard() {
            for (let i = core.startingLives - 1; i > core.currentLives - 1; i--) {
                this._liveIcons[i].visible = false;
            }

            for (let i = core.robotStartingLives - 1; i > core.robotCurrentLives - 1; i--) {
                this._robotLiveIcons[i].visible = false;
            }

            this._bulletLabel.text = "Bullets:" + core.gunBullets;
        }

        public initializeLevel():void {
            this._levelTotalTime = 15000;

            if (core.themeSound.playState != "playSucceeded")
                core.themeSound.play();

            // space object
            this._space = new objects.Space("space");
            this.addChild(this._space);

            // player object
            this._player = new objects.Player("zombie");
            this.addChild(this._player);

            // fuel box array
            this._liveBoxes = new Array<objects.PickableItem>();
            for (let i = 0; i < 2; i++) {
                this._liveBoxes.push(new objects.PickableItem("liveBox"));
                this.addChild(this._liveBoxes[i]);
            }

            // gun box array
            this._gunBoxes = new Array<objects.PickableItem>();
            for (let i = 0; i < 2; i++) {
                this._gunBoxes.push(new objects.PickableItem("gunBox"));
                this.addChild(this._gunBoxes[i]);
            }

            // spaceman array
            this._robot = new objects.Spaceman("robot",
                new createjs.Point(320, 0),
                new createjs.Point(640, 480));
            this.addChild(this._robot);

            // bullet array
            this._bullets = new Array<objects.Bullet>();
            for (let i = 0; i < 50; i++) {
                this._bullets.push(new objects.Bullet("bullet"));
                this.addChild(this._bullets[i]);
            }

            // include a collision managers
            this._collision = new managers.Collision();


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


            // add this scene to the global scene container
            core.stage.addChild(this);

            this._levelStartTime = createjs.Ticker.getTime();
        }

        public updateLevel():void {
            this._space.update();
            this._player.update();

            this._liveBoxes.forEach(fuelBox => {
                fuelBox.update();
                this._collision.check(this._player, fuelBox);
                this._liveBoxes.forEach(anotherFuelBox => {
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
            let x = 0, k = 0;
            this._robot.update();
            if (createjs.Ticker.getTime() % this._robot.timeToFire <= 19) {
                for (let bullet in this._bullets) {
                    if (!this._bullets[bullet].inFlight) {
                        x++;
                        switch (x) {
                            case 1:
                                k = 1;
                                this._bullets[bullet].dy = 2;
                                break;
                            case 2:
                                k = 0;
                                break;
                            case 3:
                                k = -1;
                                this._bullets[bullet].dy = +-2;
                                break;
                        }
                        this._bullets[bullet].fire(new objects.Vector2(this._robot.position.x, this._robot.position.y - k * 38));
                        if (x < 3)
                            continue;
                        else
                            break;
                    }
                }
            }

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
            /*
             if (createjs.Ticker.getTime() - this._levelStartTime <= this._levelTotalTime) {
             console.log("level 2 is done");
             createjs.Sound.stop();
             core.play.levelNumber++;
             core.play.ChangeLevel();
             }
             */
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

        private _shoot(event:MouseEvent):void {
            //shoot stub
        }
    }
}