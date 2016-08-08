/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 1, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.1 - Initial version of Flying Dead
 */

module managers {
    /**
     * Manages collision detection in the game
     *
     * @export
     * @class Collision
     */
    export class Collision {
        constructor() {

            this.start();
        }

        public start() {

        }

        public update() {

        }

        /**
         * Check either two objects is colliding
         *
         * @param object1
         * @param object2
         */
        public check(object1:objects.GameObject, object2:objects.GameObject) {
            if (objects.Vector2.distance(object1.position, object2.position)
                <= (object1.halfHeight + object2.halfHeight)) {
                // if chargedCloud collides with another one
                if (object1.name === "chargedCloud" && object2.name === "chargedCloud") {
                    let tempDx = (<objects.ChargedCloud> object1).dx;
                    let tempDy = (<objects.ChargedCloud> object1).dy;
                    (<objects.ChargedCloud> object1).dx = (<objects.ChargedCloud> object2).dx;
                    (<objects.ChargedCloud> object1).dy = (<objects.ChargedCloud> object2).dy;
                    (<objects.ChargedCloud> object2).dx = tempDx;
                    (<objects.ChargedCloud> object2).dy = tempDy;
                    object1.update();
                    object2.update();
                    if (objects.Vector2.distance(object1.position, object2.position)
                        < (object1.halfHeight + object2.halfHeight)) {
                        if (object1.x > object2.x) object1.x += (object2.width - (object1.x - object2.x) + 1);
                        else object2.x += (object1.width - (object2.x - object1.x) + 1);
                    }
                    // if first object is player
                } else if (object1.name === "zombie") {
                    if (!object2.isColliding) {
                        object2.isColliding = true;

                        // if zombie collides with cloud
                        if (object2.name === "chargedCloud") {
                            core.currentLives -= 1;
                            createjs.Sound.play("explosion");
                        }

                        if (object2.name === "fuelBox") {
                            if(core.fuelLevel<5)
                                core.fuelLevel++;
                            (<objects.FuelBox>object2).reset();
                            createjs.Sound.play("explosion");
                        }

                        if (object2.name === "gunBox") {
                                core.gunBullets+=5;
                            (<objects.GunBox>object2).reset();

                            //ToDo: change the sound
                            createjs.Sound.play("explosion");
                        }

                        // if zombie collides with island
                        if (object2.name === "planet") {
                            // TO-DO: change to asset load
                            (<HTMLImageElement> object2.image).src = "Assets/images/infectedPlanet.png";
                            core.score += 100;
                            createjs.Sound.play("baaaa");
                        }
                    }
                }
            } else if (object1.name === "zombie") {
                object2.isColliding = false;
            }
        }
    }
}