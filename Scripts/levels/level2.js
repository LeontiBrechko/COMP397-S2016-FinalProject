/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 1, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.1 - Initial version of Flying Dead
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var levels;
(function (levels) {
    var Level2 = (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            _super.call(this);
        }
        Level2.prototype._updateScoreBoard = function () {
            for (var i = core.startingLives - 1; i > core.currentLives - 1; i--) {
                this._liveIcons[i].visible = false;
            }
            this._scoreLabel.text = "Score: " + core.score;
            this._fuelLevelLabel.text = "Fuel Level:" + core.fuelLevel + "/5";
            this._bulletLabel.text = "Bullets:" + core.gunBullets;
        };
        Level2.prototype.InitializeLevel = function () {
            this._timer = 0;
            this._levelTimer = 0;
            core.currentLives = 1;
            // ocean object
            this._space = new objects.Space("space");
            this.addChild(this._space);
            // island object
            // player object
            this._player = new objects.Player("zombie");
            this.addChild(this._player);
            this._themeSound = createjs.Sound.play("main_theme");
            this._themeSound.loop = -1;
            // charged cloud array
            this._fuelBoxes = new Array();
            for (var i = 0; i < 2; i++) {
                this._fuelBoxes.push(new objects.FuelBox("fuelBox"));
                this.addChild(this._fuelBoxes[i]);
            }
            this._gunBoxes = new Array();
            for (var i = 0; i < 2; i++) {
                this._gunBoxes.push(new objects.GunBox("gunBox"));
                this.addChild(this._gunBoxes[i]);
            }
            // include a collision managers
            this._collision = new managers.Collision();
            // lives array
            this._liveIcons = new Array();
            for (var i = 0; i < core.startingLives; i++) {
                this._liveIcons.push(new createjs.Bitmap(core.assets.getResult("live")));
                this._liveIcons[i].x = 10 + i * this._liveIcons[0].getBounds().width;
                this._liveIcons[i].y = 5;
                this.addChild(this._liveIcons[i]);
            }
            // add core label
            this._scoreLabel = new objects.Label("Score: " + core.score, "40px", "Broadway", "#7200ff", 620, 5, false);
            this._scoreLabel.textAlign = "right";
            this.addChild(this._scoreLabel);
            this._fuelLevelLabel = new objects.Label("Fuel Level: " + core.fuelLevel + "/5", "40px", "Broadway", "#7200ff", 620, 35, false);
            this._fuelLevelLabel.textAlign = "right";
            this.addChild(this._fuelLevelLabel);
            this._bulletLabel = new objects.Label("Fuel Level: " + core.gunBullets, "40px", "Broadway", "#7200ff", 620, 65, false);
            this._bulletLabel.textAlign = "right";
            this.addChild(this._bulletLabel);
            // add stub next level button
            this._stubNextLevelButton = new objects.Button("nextLevelStub", 320, 440, true);
            this._stubNextLevelButton.on("click", this._nextLevel, this);
            this.addChild(this._stubNextLevelButton);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Level2.prototype.UpdateLevel = function () {
            var _this = this;
            this._space.update();
            this._player.update();
            this._fuelBoxes.forEach(function (asteroid) {
                asteroid.update();
                _this._collision.check(_this._player, asteroid);
                _this._fuelBoxes.forEach(function (anotherAsteroid) {
                    if (anotherAsteroid != asteroid &&
                        asteroid.isColliding === anotherAsteroid.isColliding) {
                        _this._collision.check(asteroid, anotherAsteroid);
                    }
                });
            });
            this._gunBoxes.forEach(function (asteroid) {
                asteroid.update();
                _this._collision.check(_this._player, asteroid);
                _this._gunBoxes.forEach(function (anotherAsteroid) {
                    if (anotherAsteroid != asteroid &&
                        asteroid.isColliding === anotherAsteroid.isColliding) {
                        _this._collision.check(asteroid, anotherAsteroid);
                    }
                });
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
            if (this._timer >= 120) {
                this._timer = 0;
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
            this._timer++;
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