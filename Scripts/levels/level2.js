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
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            _super.call(this);
        }
        Level2.prototype._updateScoreBoard = function () {
            for (var i = core.startingLives - 1; i > core.currentLives - 1; i--) {
                this._liveIcons[i].visible = false;
            }
            this._fuelLevelLabel.text = "Fuel Level:" + core.fuelLevel + "/5";
            this._bulletLabel.text = "Bullets:" + core.gunBullets;
        };
        Level2.prototype.initializeLevel = function () {
            this._levelTotalTime = 15000;
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
            this._fuelBoxes = new Array();
            for (var i = 0; i < 2; i++) {
                this._fuelBoxes.push(new objects.PickableItem("fuelBox"));
                this.addChild(this._fuelBoxes[i]);
            }
            // gun box array
            this._gunBoxes = new Array();
            for (var i = 0; i < 2; i++) {
                this._gunBoxes.push(new objects.PickableItem("gunBox"));
                this.addChild(this._gunBoxes[i]);
            }
            // spaceman array
            this._spacemen = new Array();
            for (var i = 0; i < 2; i++) {
                this._spacemen.push(new objects.Spaceman("spaceman", new createjs.Point(400, i * 240), new createjs.Point(640, (i + 1) * 240)));
                this.addChild(this._spacemen[i]);
            }
            // bullet array
            this._bullets = new Array();
            for (var i = 0; i < 10; i++) {
                this._bullets.push(new objects.Bullet("bullet"));
                this.addChild(this._bullets[i]);
            }
            // include a collision managers
            this._collision = new managers.Collision();
            this._fuelLevelLabel =
                new objects.Label("Fuel Level: " + core.fuelLevel + "/5", "40px", "BroadwayFont", "#7200ff", 620, 5, false);
            this._fuelLevelLabel.textAlign = "right";
            this.addChild(this._fuelLevelLabel);
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
            // add stub next level button
            this._stubNextLevelButton = new objects.Button("nextLevelStub", 320, 430, true);
            this._stubNextLevelButton.on("click", this._nextLevel, this);
            this.addChild(this._stubNextLevelButton);
            // add this scene to the global scene container
            core.stage.addChild(this);
            this._levelStartTime = createjs.Ticker.getTime();
        };
        Level2.prototype.updateLevel = function () {
            var _this = this;
            this._space.update();
            this._player.update();
            this._fuelBoxes.forEach(function (fuelBox) {
                fuelBox.update();
                _this._collision.check(_this._player, fuelBox);
                _this._fuelBoxes.forEach(function (anotherFuelBox) {
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
            this._spacemen.forEach(function (spaceman) {
                spaceman.update();
                if (createjs.Ticker.getTime() % spaceman.timeToFire <= 19) {
                    for (var bullet in _this._bullets) {
                        if (!_this._bullets[bullet].inFlight) {
                            _this._bullets[bullet].fire(spaceman.position);
                            break;
                        }
                    }
                }
            });
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
            if (createjs.Ticker.getTime() % core.gameSpeed <= 19) {
                if (core.fuelLevel > 0)
                    core.fuelLevel--;
            }
            if (createjs.Ticker.getTime() - this._levelStartTime <= this._levelTotalTime) {
                this._playerIcon.x = 10 +
                    (createjs.Ticker.getTime() - this._levelStartTime) / this._levelTotalTime
                        * (620 - this._playerIcon.getBounds().width);
            }
            else {
                console.log("level 2 is done");
                createjs.Sound.stop();
                core.play.levelNumber++;
                core.play.ChangeLevel();
            }
        };
        // EVENT HANDLERS ++++++++++++++++
        /**
         * Simulates next level continuation
         *
         * @param event
         * @private
         */
        Level2.prototype._nextLevel = function (event) {
            createjs.Sound.stop();
            core.play.levelNumber++;
            core.play.ChangeLevel();
        };
        return Level2;
    }(objects.Level));
    levels.Level2 = Level2;
})(levels || (levels = {}));
//# sourceMappingURL=level2.js.map