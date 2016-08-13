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
            super(imageString)
            this.alpha = 0.4;
            this.start();
        }


        // PRIVATE METHODS
        public reset():void {
            this.position = this._defaultPosition;
            this.x = this.position.x;
            this.y = this.position.y;
            this.inFlight = false;
            this.dy=0;
        }

        private  _checkBounds():void {
            if (this.position.x <= -this.width) {
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
            this._defaultPosition = new Vector2(1000, 1000);
            this.dx = -10;
            this.reset();
        }

        public update():void {
            if (this.inFlight) {
                this.x += this.dx;
                this.y += this.dy;
                this.position.x = this.x;
                this.position.y = this.y;
                this._checkBounds();
            }
        }
    }
}