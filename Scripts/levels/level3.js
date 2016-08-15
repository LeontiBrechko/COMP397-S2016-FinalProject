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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var levels;
(function (levels) {
    /**
     * This is the Level3 class for the level with Boss
     *
     * @export
     * @class Level3
     * @extends {createjs.Bitmap}
     */
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            _super.call(this);
            this.on("click", this._shoot);
            window.addEventListener("keydown", this._keyPressedEvent);
        }
        Level3.prototype._updateScoreBoard = function () {
            for (var i = core.gameStartingLives - 1; i > Math.max(core.currentLives - 1, 0); i--) {
                this._playerLiveIcons[i].visible = false;
            }
            for (var i = 0; i < core.currentLives; i++) {
                this._playerLiveIcons[i].visible = true;
            }
            for (var i = core.robotStartingLives - 1; i > Math.max(core.robotCurrentLives - 1, 0); i--) {
                this._robotLiveIcons[i].visible = false;
            }
            this._bulletLabel.text = "Bullets:" + core.currentGunBullets;
        };
        Level3.prototype.initializeLevel = function () {
            if (core.themeSound.playState != "playSucceeded")
                core.themeSound.play();
            core.levelStartingScore = core.score;
            core.levelStartingLives = core.currentLives;
            core.levelStartingBullets = core.bulletsCollected;
            this._timeToGo = createjs.Ticker.getTime() + 5000;
            // space object
            this._space = new objects.Space("space");
            this.addChild(this._space);
            // player object
            this._player = new objects.Player("shootingZombie");
            // fuel box array
            this._liveBoxes = new Array();
            for (var i = 0; i < 2; i++) {
                this._liveBoxes.push(new objects.PickableItem("liveBox"));
            }
            // gun box array
            this._gunBoxes = new Array();
            for (var i = 0; i < 2; i++) {
                this._gunBoxes.push(new objects.PickableItem("gunBox"));
            }
            // spaceman array
            this._robot = new objects.Enemy("robot", new createjs.Point(320, 0), new createjs.Point(640, 480));
            // bullet array
            this._robotBullets = new Array();
            for (var i = 0; i < 20; i++) {
                this._robotBullets.push(new objects.Bullet("bullet"));
            }
            // player bullets
            this._playerBullets = new Array();
            for (var i = 0; i < 20; i++) {
                this._playerBullets.push(new objects.Bullet("playerBullet"));
                this._playerBullets[i].dx = 10;
            }
            // include a collision managers
            this._collision = new managers.Collision();
            this._bulletLabel =
                new objects.Label("Fuel Level: " + core.currentGunBullets, "40px", "BroadwayFont", "#7200ff", 620, 35, false);
            this._bulletLabel.textAlign = "right";
            // player lives array
            this._playerLiveIcons = new Array();
            for (var i = 0; i < core.gameStartingLives; i++) {
                this._playerLiveIcons.push(new createjs.Bitmap(core.assets.getResult("live")));
                this._playerLiveIcons[i].x = 10 + i * this._playerLiveIcons[0].getBounds().width;
                this._playerLiveIcons[i].y = 5;
            }
            // robot lives array
            this._robotLiveIcons = new Array();
            for (var i = 0; i < core.robotStartingLives; i++) {
                this._robotLiveIcons.push(new createjs.Bitmap(core.assets.getResult("robotLive")));
                this._robotLiveIcons[i].x = 598 - i * this._robotLiveIcons[0].getBounds().width;
                this._robotLiveIcons[i].y = 5;
            }
            // preparation label
            this._preparationLabel = new objects.Label("GET READY TO SHOOT!", "40px", "BroadwayFont", "#7200ff", 320, 240, true);
            this.addChild(this._preparationLabel);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Level3.prototype.updateLevel = function () {
            var _this = this;
            this._space.update();
            if (createjs.Ticker.getTime() < this._timeToGo)
                return;
            this.removeChild(this._preparationLabel);
            this._addAllObjects();
            this._player.update();
            this._liveBoxes.forEach(function (fuelBox) {
                fuelBox.update();
                _this._collision.check(_this._player, fuelBox);
                _this._liveBoxes.forEach(function (anotherFuelBox) {
                    if (anotherFuelBox != fuelBox &&
                        fuelBox.isColliding === anotherFuelBox.isColliding) {
                        _this._collision.check(fuelBox, anotherFuelBox);
                    }
                });
                _this._gunBoxes.forEach(function (gunBox) {
                    if (fuelBox.isColliding === gunBox.isColliding) {
                        _this._collision.check(fuelBox, gunBox);
                    }
                });
            });
            this._gunBoxes.forEach(function (gunBox) {
                gunBox.update();
                _this._collision.check(_this._player, gunBox);
                _this._gunBoxes.forEach(function (anotherGunBox) {
                    if (anotherGunBox != gunBox &&
                        gunBox.isColliding === anotherGunBox.isColliding) {
                        _this._collision.check(gunBox, anotherGunBox);
                    }
                });
            });
            var x = 0, k = 0;
            this._robot.update();
            if (createjs.Ticker.getTime() % this._robot.timeToFire <= 19) {
                for (var bullet in this._robotBullets) {
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
                        this._robotBullets[bullet].fire(new objects.Vector2(this._robot.position.x, this._robot.position.y - k * 38));
                        if (x < 3)
                            continue;
                        else
                            break;
                    }
                }
            }
            this._robotBullets.forEach(function (bullet) {
                bullet.update();
                if (bullet.inFlight) {
                    _this._collision.check(_this._player, bullet);
                }
            });
            this._playerBullets.forEach(function (bullet) {
                bullet.update();
                if (bullet.inFlight) {
                    _this._collision.check(_this._robot, bullet);
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
        };
        Level3.prototype._addAllObjects = function () {
            this.addChild(this._player);
            for (var i = 0; i < 2; i++) {
                this.addChild(this._liveBoxes[i]);
                this.addChild(this._gunBoxes[i]);
            }
            this.addChild(this._robot);
            for (var i = 0; i < 20; i++) {
                this.addChild(this._robotBullets[i]);
                this.addChild(this._playerBullets[i]);
            }
            this.addChild(this._bulletLabel);
            for (var i = 0; i < core.gameStartingLives; i++) {
                this.addChild(this._playerLiveIcons[i]);
            }
            for (var i = 0; i < core.robotCurrentLives; i++) {
                this.addChild(this._robotLiveIcons[i]);
            }
        };
        // EVENT HANDLERS ++++++++++++++++
        Level3.prototype._shoot = function (event) {
            for (var bullet in this._playerBullets) {
                if (core.currentGunBullets > 0 && !this._playerBullets[bullet].inFlight) {
                    this._playerBullets[bullet].fire(new objects.Vector2(this._player.position.x, this._player.position.y));
                    core.currentGunBullets -= 1;
                    break;
                }
            }
        };
        /**
         * This event handler handle all the cheats combinations
         *
         * @private
         * @param {KeyboardEvent} event
         */
        Level3.prototype._keyPressedEvent = function (event) {
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
                    case 66:
                        createjs.Sound.play("cheat");
                        console.log(event.keyCode);
                        if (core.robotCurrentLives > 0)
                            core.robotCurrentLives--;
                        break;
                }
            }
        };
        return Level3;
    }(objects.Level));
    levels.Level3 = Level3;
})(levels || (levels = {}));
//# sourceMappingURL=level3.js.map