/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 1, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.1 - Initial version of Flying Dead
 */

module scenes {
    export class Play extends objects.Scene {
        //  PRIVATE INSTANCE VARIABLES
        private _currentLevel:objects.Level;
        private _levelNumber: number;

        get levelNumber():number {
            return this._levelNumber;
        }

        set levelNumber(newLevel:number) {
            this._levelNumber = newLevel;
        }

        constructor() {
            super();
        }

        public Start():void {
            // start with the first level
            this._levelNumber = config.Level.LEVEL_1;
            this._currentLevel = new levels.Level1();
        }

        public Update():void {
            this._currentLevel.UpdateLevel();
        }

        public ChangeLevel():void {
            //Launch Various Levels
            switch (this._levelNumber) {
                // Show LEVEL 1
                case config.Level.LEVEL_1:
                    this._currentLevel.removeAllChildren();
                    this._currentLevel = new levels.Level1();
                    break;
                case config.Level.LEVEL_2:
                    this._currentLevel.removeAllChildren();
                    this._currentLevel = new levels.Level2();
                    break;
                case config.Level.LEVEL_3:
                    this._currentLevel.removeAllChildren();
                    this._currentLevel = new levels.Level3();
                    break;
            }
        }
    }
}