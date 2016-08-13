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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var levels;
(function (levels) {
    /**
     * This is the Level1 class for the level with Enemies, fuelBoxes, and gunBoxes
     *
     * @export
     * @class Level1
     * @extends {createjs.Bitmap}
     */
    var Level3 = (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            _super.call(this);
            this.on("click", this._shoot);
        }
        Level3.prototype._updateScoreBoard = function () {
            for (var i = core.startingLives - 1; i > core.currentLives - 1; i--) {
                this._liveIcons[i].visible = false;
            }
            for (var i = core.robotStartingLives - 1; i > core.robotCurrentLives - 1; i--) {
                this._robotLiveIcons[i].visible = false;
            }
            this._bulletLabel.text = "Bullets:" + core.gunBullets;
        };
        Level3.prototype.initializeLevel = function () {
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
            this._liveBoxes = new Array();
            for (var i = 0; i < 2; i++) {
                this._liveBoxes.push(new objects.PickableItem("liveBox"));
                this.addChild(this._liveBoxes[i]);
            }
            // gun box array
            this._gunBoxes = new Array();
            for (var i = 0; i < 2; i++) {
                this._gunBoxes.push(new objects.PickableItem("gunBox"));
                this.addChild(this._gunBoxes[i]);
            }
            // spaceman array
            this._robot = new objects.Spaceman("robot", new createjs.Point(320, 0), new createjs.Point(640, 480));
            this.addChild(this._robot);
            // bullet array
            this._bullets = new Array();
            for (var i = 0; i < 50; i++) {
                this._bullets.push(new objects.Bullet("bullet"));
                this.addChild(this._bullets[i]);
            }
            // include a collision managers
            this._collision = new managers.Collision();
            this._bulletLabel =
                new objects.Label("Fuel Level: " + core.gunBullets, "40px", "BroadwayFont", "#7200ff", 620, 35, false);
            this._bulletLabel.textAlign = "right";
            this.addChild(this._bulletLabel);
            // lives array
            this._liveIcons = new Array();
            for (var i = 0; i < core.startingLives; i++) {
                this._liveIcons.push(new createjs.Bitmap(core.assets.getResult("live")));
                this._liveIcons[i].x = 10 + i * this._liveIcons[0].getBounds().width;
                this._liveIcons[i].y = 5;
                this.addChild(this._liveIcons[i]);
            }
            // add this scene to the global scene container
            core.stage.addChild(this);
            this._levelStartTime = createjs.Ticker.getTime();
        };
        Level3.prototype.updateLevel = function () {
            var _this = this;
            this._space.update();
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
                for (var bullet in this._bullets) {
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
            this._bullets.forEach(function (bullet) {
                bullet.update();
                if (bullet.inFlight) {
                    _this._collision.check(_this._player, bullet);
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
        };
        // EVENT HANDLERS ++++++++++++++++
        /**
         * Simulates next level continuation
         *
         * @param event
         * @private
         */
        Level3.prototype._nextLevel = function (event) {
            createjs.Sound.stop();
            core.play.levelNumber++;
            core.play.ChangeLevel();
        };
        Level3.prototype._shoot = function (event) {
            console.log(0);
            for (var bullet1 in this._bullets) {
                console.log(1);
                if (!this._bullets[bullet1].inFlight) {
                    console.log(2);
                    this._bullets[bullet1].dx = 10;
                    this._bullets[bullet1].fire(this._player.position);
                }
            }
        };
        return Level3;
    }(objects.Level));
    levels.Level3 = Level3;
})(levels || (levels = {}));
//# sourceMappingURL=level3.js.map