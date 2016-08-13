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
var config;
(function (config) {
    /**
     * Enumeration-like class that contains appropriate level value
     *
     * @export
     * @class Level
     */
    var Level = (function () {
        function Level() {
        }
        Level.LEVEL_1 = 0;
        Level.LEVEL_2 = 1;
        Level.LEVEL_3 = 2;
        return Level;
    }());
    config.Level = Level;
})(config || (config = {}));
//# sourceMappingURL=level.js.map