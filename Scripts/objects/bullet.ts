/**
 * @filename: bullet.ts
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 15, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.3 - Version includes levels 1, 2, and 3
 */

module objects {
    /**
     * This is the Bullet object used in the level 2 by enemies
     *
     * @export
     * @class Bullet
     * @extends {createjs.Bitmap}
     */
    export class Bullet extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES
        private _defaultPosition:objects.Vector2;
        private _inFlight:boolean;

        // PUBLIC PROPERTIES
        get inFlight():boolean {
            return this._inFlight;
        }

        set inFlight(newState:boolean) {
            this._inFlight = newState;
        }

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        constructor(imageString:string) {
            super(imageString);
            this.alpha = 0.4;
            this.start();
        }


        // PRIVATE METHODS
        public reset():void {
            this.position = this._defaultPosition;
            this.x = this.position.x;
            this.y = this.position.y;
            this.inFlight = false;
            this.dy = 0;
        }

        private  _checkBounds():void {
            if (this.position.x <= -this.width || this.position.x >= 640 + this.width) {
                this.reset();
            }
        }

        // PUBLIC METHODS
        public fire(newPosition:Vector2):void {
            this.x = newPosition.x;
            this.y = newPosition.y;
            this.position = newPosition;
            this.inFlight = true;
            createjs.Sound.play("pew");
        }


        public start():void {
            this._defaultPosition = new Vector2(500, 1000);
            this.dx = -10;
            this.reset();
        }

        public update():void {
            if (this.inFlight) {
                this.position.x = this.x += this.dx;
                this.position.y = this.y += this.dy;
                this._checkBounds();
            }
        }
    }
}