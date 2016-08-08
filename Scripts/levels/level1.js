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
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.call(this);
        }
        Level1.prototype._updateScoreBoard = function () {
            for (var i = core.startingLives - 1; i > core.currentLives - 1; i--) {
                this._liveIcons[i].visible = false;
            }
            this._scoreLabel.text = "Score: " + core.score;
        };
        Level1.prototype.InitializeLevel = function () {
            // ocean object
            this._space = new objects.Space("space");
            this.addChild(this._space);
            // island object
            this._planet = new objects.Planet("planet");
            this.addChild(this._planet);
            // player object
            this._player = new objects.Player("zombie");
            this.addChild(this._player);
            this._themeSound = createjs.Sound.play("main_theme");
            this._themeSound.loop = -1;
            // charged cloud array
            this._chargedClouds = new Array();
            for (var i = 0; i < 3; i++) {
                this._chargedClouds.push(new objects.ChargedCloud("chargedCloud"));
                this.addChild(this._chargedClouds[i]);
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
            this._scoreLabel = new objects.Label("Score: " + core.score, "40px", "Broadway", "#7200ff", 450, 5, false);
            this._scoreLabel.textAlign = "center";
            this.addChild(this._scoreLabel);
            // add stub next level button
            this._stubNextLevelButton = new objects.Button("nextLevelStub", 320, 440, true);
            this._stubNextLevelButton.on("click", this._nextLevel, this);
            this.addChild(this._stubNextLevelButton);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Level1.prototype.UpdateLevel = function () {
            var _this = this;
            this._space.update();
            this._planet.update();
            this._player.update();
            this._collision.check(this._player, this._planet);
            this._chargedClouds.forEach(function (asteroid) {
                asteroid.update();
                _this._collision.check(_this._player, asteroid);
                _this._chargedClouds.forEach(function (anotherAsteroid) {
                    if (anotherAsteroid != asteroid &&
                        asteroid.isColliding === anotherAsteroid.isColliding) {
                        _this._collision.check(asteroid, anotherAsteroid);
                    }
                });
            });
            this._updateScoreBoard();
            if (core.currentLives < 1) {
                createjs.Sound.stop();
                createjs.Sound.play("over");
                core.scene = config.Scene.OVER;
                core.changeScene();
            }
            // stub test on score
            if (core.score >= 300) {
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
        Level1.prototype._nextLevel = function (event) {
            createjs.Sound.stop();
            core.play.levelNumber++;
            core.play.ChangeLevel();
        };
        return Level1;
    }(objects.Level));
    levels.Level1 = Level1;
})(levels || (levels = {}));
//# sourceMappingURL=level1.js.map