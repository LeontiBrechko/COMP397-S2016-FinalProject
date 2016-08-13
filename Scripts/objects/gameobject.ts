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
     * This class represents a generic Game Object used in the game
     *
     * @export
     * @class GameObject
     * @extends {createjs.Bitmap}
     */
    export abstract class GameObject extends createjs.Bitmap {
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        private _width:number;
        private _height:number;
        private _name:string;
        private _position:Vector2;
        private _isColliding:boolean;
        private _dx:number;
        private _dy:number;
        private _isActive:boolean;
        public sound:createjs.AbstractSoundInstance;

        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++

        get width():number {
            return this._width;
        }

        set width(newWidth:number) {
            this._width = newWidth;
        }

        get halfWidth():number {
            return this._width * 0.5;
        }

        get height():number {
            return this._height;
        }

        set height(newHeight:number) {
            this._height = newHeight;
        }

        get halfHeight():number {
            return this._height * 0.5;
        }

        get name():string {
            return this._name;
        }

        set name(newName:string) {
            this._name = newName;
        }

        get position():Vector2 {
            return this._position;
        }

        set position(newPosition:Vector2) {
            this._position = newPosition;
        }

        get isColliding():boolean {
            return this._isColliding;
        }

        set isColliding(newState:boolean) {
            this._isColliding = newState;
        }

        get dy():number {
            return this._dy;
        }

        set dy(newDy:number) {
            this._dy = newDy;
        }

        get dx():number {
            return this._dx;
        }

        set dx(newDx:number) {
            this._dx = newDx;
        }

        get isActive():boolean {
            return this._isActive;
        }

        set isActive(newStatus:boolean) {
            this._isActive = newStatus;
        }

        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of the GameObject.
         *
         * @constructor
         * @param {string} imageString
         */
        constructor(imageString:string) {
            super(core.assets.getResult(imageString))

            this._initialize(imageString);

            // this.start();
        }

        private _initialize(imageString:string):void {
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.position = new Vector2(this.x, this.y);
            this.isColliding = false;
            this.isActive = true;
        }

        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        public abstract start():void;

        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        public abstract update():void;

        public abstract reset():void;

    }
}