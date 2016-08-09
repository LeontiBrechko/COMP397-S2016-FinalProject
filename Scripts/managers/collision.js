/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 1, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.1 - Initial version of Flying Dead
 */
var managers;
(function (managers) {
    /**
     * Manages collision detection in the game
     *
     * @export
     * @class Collision
     */
    var Collision = (function () {
        function Collision() {
            this.start();
        }
        Collision.prototype.start = function () {
        };
        Collision.prototype.update = function () {
        };
        /**
         * Check either two objects is colliding
         *
         * @param object1
         * @param object2
         */
        Collision.prototype.check = function (object1, object2) {
            if (objects.Vector2.distance(object1.position, object2.position)
                <= (object1.halfHeight + object2.halfHeight)) {
                // if first object is not a player
                if (object1.name !== "zombie") {
                    var tempDx = object1.dx;
                    var tempDy = object1.dy;
                    object1.dx = object2.dx;
                    object1.dy = object2.dy;
                    object2.dx = tempDx;
                    object2.dy = tempDy;
                    object1.update();
                    object2.update();
                    if (objects.Vector2.distance(object1.position, object2.position)
                        < (object1.halfHeight + object2.halfHeight)) {
                        if (object1.x > object2.x)
                            object1.x += (object2.width - (object1.x - object2.x) + 1);
                        else
                            object2.x += (object1.width - (object2.x - object1.x) + 1);
                    }
                }
                else {
                    if (!object2.isColliding) {
                        object2.isColliding = true;
                        // if zombie collides with cloud
                        if (object2.name === "chargedCloud") {
                            core.currentLives -= 1;
                            createjs.Sound.play("explosion");
                        }
                        if (object2.name === "fuelBox") {
                            if (core.fuelLevel < 5)
                                core.fuelLevel++;
                            object2.reset();
                            createjs.Sound.play("fuelPick");
                        }
                        if (object2.name === "gunBox") {
                            core.gunBullets += 5;
                            object2.reset();
                            //TODO: change the sound
                            createjs.Sound.play("gunPick");
                        }
                        // if zombie collides with island
                        if (object2.name === "planet") {
                            // TODO: change to asset load
                            object2.image.src = "Assets/images/infectedPlanet.png";
                            core.score += 100;
                            createjs.Sound.play("baaaa");
                        }
                        // if zombie collides with bullet
                        if (object2.name === "bullet") {
                            core.currentLives -= 1;
                            object2.reset();
                            createjs.Sound.play("laserHit");
                        }
                    }
                }
            }
            else if (object1.name === "zombie") {
                object2.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map