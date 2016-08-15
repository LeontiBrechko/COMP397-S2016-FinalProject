/**
 * @filename: level3.ts
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
        private _robot:objects.Enemy;
        private _robotBullets:objects.Bullet[];
        private _playerBullets:objects.Bullet[];
        private _collision:managers.Collision;
        private _playerLiveIcons:createjs.Bitmap[];
        private _robotLiveIcons:createjs.Bitmap[];
        private _bulletLabel:objects.Label;
        private _preparationLabel:objects.Label;
        private _timeToGo:number;

        constructor() {
            super();
            this.on("click", this._shoot);
        }

        private _updateScoreBoard() {
            for (let i = core.gameStartingLives - 1; i > Math.max(core.currentLives - 1, 0); i--) {
                this._playerLiveIcons[i].visible = false;
            }

            for (let i = 0; i < core.currentLives; i++) {
                this._playerLiveIcons[i].visible = true;
            }

            for (let i = core.robotStartingLives - 1; i > core.robotCurrentLives - 1; i--) {
                this._robotLiveIcons[i].visible = false;
            }

            this._bulletLabel.text = "Bullets:" + core.currentGunBullets;
        }

        public initializeLevel():void {
            if (core.themeSound.playState != "playSucceeded")
                core.themeSound.play();

            core.levelStartingLives = core.currentLives;
            core.levelStartingBullets = core.bulletsCollected;
            this._timeToGo = createjs.Ticker.getTime() + 5000;

            // space object
            this._space = new objects.Space("space");
            this.addChild(this._space);

            // player object
            this._player = new objects.Player("shootingZombie");

            // fuel box array
            this._liveBoxes = new Array<objects.PickableItem>();
            for (let i = 0; i < 2; i++) {
                this._liveBoxes.push(new objects.PickableItem("liveBox"));
            }

            // gun box array
            this._gunBoxes = new Array<objects.PickableItem>();
            for (let i = 0; i < 2; i++) {
                this._gunBoxes.push(new objects.PickableItem("gunBox"));
            }

            // spaceman array
            this._robot = new objects.Enemy("robot",
                new createjs.Point(320, 0),
                new createjs.Point(640, 480));

            // bullet array
            this._robotBullets = new Array<objects.Bullet>();
            for (let i = 0; i < 20; i++) {
                this._robotBullets.push(new objects.Bullet("bullet"));
            }

            // player bullets
            this._playerBullets = new Array<objects.Bullet>();
            for (let i = 0; i < 20; i++) {
                this._playerBullets.push(new objects.Bullet("playerBullet"));
                this._playerBullets[i].dx = 10;
            }

            // include a collision managers
            this._collision = new managers.Collision();

            this._bulletLabel =
                new objects.Label("Fuel Level: " + core.currentGunBullets,
                    "40px", "BroadwayFont", "#7200ff", 620, 35, false);
            this._bulletLabel.textAlign = "right";

            // player lives array
            this._playerLiveIcons = new Array<createjs.Bitmap>();
            for (let i = 0; i < core.gameStartingLives; i++) {
                this._playerLiveIcons.push(new createjs.Bitmap(core.assets.getResult("live")));
                this._playerLiveIcons[i].x = 10 + i * this._playerLiveIcons[0].getBounds().width;
                this._playerLiveIcons[i].y = 5;
            }

            // robot lives array
            this._robotLiveIcons = new Array<createjs.Bitmap>();
            for (let i = 0; i < core.robotCurrentLives; i++) {
                this._robotLiveIcons.push(new createjs.Bitmap(core.assets.getResult("robotLive")));
                this._robotLiveIcons[i].x = 598 - i * this._robotLiveIcons[0].getBounds().width;
                this._robotLiveIcons[i].y = 5;
            }

            // preparation label
            this._preparationLabel = new objects.Label(
                "GET READY TO SHOOT!", "40px", "BroadwayFont", "#7200ff", 320, 240, true
            );
            this.addChild(this._preparationLabel);

            // add this scene to the global scene container
            core.stage.addChild(this);
        }

        public updateLevel():void {
            this._space.update();
            if (createjs.Ticker.getTime() < this._timeToGo)
                return;

            this.removeChild(this._preparationLabel);
            this._addAllObjects();
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
                for (let bullet in this._robotBullets) {
                    if (!this._robotBullets[bullet].inFlight) {
                        x++;
                        switch (x) {
                            case 1:
                                k = 1;
                                break;
                            case 2:
                                k = 0;
                                break;
                            case 3:
                                k = -1;
                                break;
                        }
                        this._robotBullets[bullet].dy = 2 * k;
                        this._robotBullets[bullet].fire(
                            new objects.Vector2(this._robot.position.x, this._robot.position.y - k * 38)
                        );
                        if (x < 3)
                            continue;
                        else
                            break;
                    }
                }
            }

            this._robotBullets.forEach(bullet => {
                bullet.update();
                if (bullet.inFlight) {
                    this._collision.check(this._player, bullet);
                }
            });


            this._playerBullets.forEach(bullet => {
                bullet.update();
                if (bullet.inFlight) {
                    this._collision.check(this._robot, bullet);
                }
            });

            this._updateScoreBoard();

            if (core.currentLives < 1 || core.fuelLevel < 1) {
                createjs.Sound.stop();
                createjs.Sound.play("over");
                core.scene = config.Scene.OVER;
                core.changeScene();
            }

            if (core.robotCurrentLives < 1) {
                createjs.Sound.stop();
                createjs.Sound.play("taDaFinal");
                core.scene = config.Scene.OVER;
                core.wonGame = true;
                core.changeScene();
            }
        }

        private _addAllObjects() {
            this.addChild(this._player);
            for (let i = 0; i < 2; i++) {
                this.addChild(this._liveBoxes[i]);
                this.addChild(this._gunBoxes[i]);
            }
            this.addChild(this._robot);
            for (let i = 0; i < 20; i++) {
                this.addChild(this._robotBullets[i]);
                this.addChild(this._playerBullets[i]);
            }
            this.addChild(this._bulletLabel);
            for (let i = 0; i < core.gameStartingLives; i++) {
                this.addChild(this._playerLiveIcons[i]);
            }
            for (let i = 0; i < core.robotCurrentLives; i++) {
                this.addChild(this._robotLiveIcons[i]);
            }
        }

        // EVENT HANDLERS ++++++++++++++++
        private _shoot(event:MouseEvent):void {
            for (let bullet in this._playerBullets) {
                if (core.currentGunBullets > 0 && !this._playerBullets[bullet].inFlight) {
                    this._playerBullets[bullet].fire(
                        new objects.Vector2(this._player.position.x, this._player.position.y)
                    );
                    core.currentGunBullets -= 1;
                    break;
                }
            }
        }
    }
}