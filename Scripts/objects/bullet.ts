module objects {
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

            this.start();
        }


        // PRIVATE METHODS
        public reset():void {
            this.position = this._defaultPosition;
            this.x = this.position.x;
            this.y = this.position.y;
            this.inFlight = false;
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
            // createjs.Sound.play("bulletFire");
        }


        public start():void {
            this._defaultPosition = new Vector2(1000, 1000);
            this.dx = -10;
            this.reset();
        }

        public update():void {
            if (this.inFlight) {
                this.x += this.dx;
                this.position.x = this.x;
                this.position.y = this.y;
                this._checkBounds();
            }
        }
    }
}