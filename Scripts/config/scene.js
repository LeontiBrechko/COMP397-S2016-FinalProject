/**
 * @author Anton Bogun
 * @author Liavontsi Brechka
 * @studentID 300863440
 * @studentID 300800345
 * @date August 1, 2016
 * @description COMP397 - Web Game Programming - Final Project - The JavaScript Arcade Game
 * @version 0.1 - Initial version of Flying Dead
 */
var config;
(function (config) {
    /**
     * Enumeration-like class that contains appropriate scene value
     *
     * @export
     * @class Scene
     */
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.PLAY = 1;
        Scene.OVER = 2;
        Scene.INSTRUCTIONS = 3;
        Scene.EXIT = 4;
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));
//# sourceMappingURL=scene.js.map