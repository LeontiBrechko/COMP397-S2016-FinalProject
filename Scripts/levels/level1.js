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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var levels;
(function (levels) {
    /**
     * This is the Level1 class for the level with ChargedClouds
     *
     * @export
     * @class Level1
     * @extends {createjs.Bitmap}
     */
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.call(this);
            window.addEventListener("keydown", this._keyPressedEvent);
        }
        /**
         * This method updates score board of the level
         *
         * @private
         */
        Level1.prototype._updateScoreBoard = function () {
            for (var i = 0; i < this._liveIcons.length; i++)
                this._liveIcons[i].visible = true;
            for (var i = core.gameStartingLives - 1; i > Math.max(core.currentLives - 1, 0); i--) {
                this._liveIcons[i].visible = false;
            }
            this._scoreLabel.text = "Score: " + core.score;
        };
        /**
         * Entry point of the level
         */
        Level1.prototype.initializeLevel = function () {
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
            this._chargedClouds = new Array();
            for (var i = 0; i < 3; i++) {
                this._chargedClouds.push(new objects.ChargedCloud("chargedCloud"));
                this.addChild(this._chargedClouds[i]);
            }
            // include a collision managers
            this._collision = new managers.Collision();
            // lives array
            this._liveIcons = new Array();
            for (var i = 0; i < core.gameStartingLives; i++) {
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
        };
        /**
         * This method update level
         */
        Level1.prototype.updateLevel = function () {
            var _this = this;
            this._space.update();
            this._player.update();
            if (core.score < 800) {
                this._planet.update();
                this._collision.check(this._player, this._planet);
                this._chargedClouds.forEach(function (cloud) {
                    cloud.update();
                    _this._collision.check(_this._player, cloud);
                    _this._chargedClouds.forEach(function (anotherCloud) {
                        if (anotherCloud != cloud &&
                            cloud.isColliding === anotherCloud.isColliding) {
                            _this._collision.check(cloud, anotherCloud);
                        }
                    });
                });
            }
            else {
                if (this._planet.x > 0 - this._planet.width) {
                    this._planet.update();
                    this._collision.check(this._player, this._planet);
                }
                else {
                    this._planet.isActive = false;
                }
                this._chargedClouds.forEach(function (cloud) {
                    if (cloud.isActive && cloud.x > 0 - cloud.width) {
                        cloud.update();
                        _this._collision.check(_this._player, cloud);
                        _this._chargedClouds.forEach(function (anotherCloud) {
                            if (anotherCloud != cloud &&
                                cloud.isColliding === anotherCloud.isColliding) {
                                _this._collision.check(cloud, anotherCloud);
                            }
                        });
                    }
                    else {
                        cloud.isActive = false;
                    }
                });
                if (!this._planet.isActive
                    && this._chargedClouds.filter(function (cloud) { return cloud.isActive; }).length === 0
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
        };
        // EVENT HANDLERS ++++++++++++++++
        /**
         * This event handler handle all the cheats combinations
         *
         * @private
         * @param {KeyboardEvent} event
         */
        Level1.prototype._keyPressedEvent = function (event) {
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
        };
        return Level1;
    }(objects.Level));
    levels.Level1 = Level1;
})(levels || (levels = {}));
//# sourceMappingURL=level1.js.map