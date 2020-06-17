/** @file Numeric measurements for several properties and objects in the game.
 *	@author Ofek Atar
 */


/** @type {string} Value for game screen width.*/
const WIDTH = 1920;
/** @type {string} Value for game screen height.*/
const HEIGHT = 1053;
/** @type {string} Value for potion sprite side size.*/
const POTION_SIDE = 141;
/** @type {string} Value for grid container width.*/
const CONTAINER_X = WIDTH / 2;
/** @type {string} Value for grid container height.*/
const CONTAINER_Y = HEIGHT / 2;
/** @type {string} Value for grid container x coordinate.*/
const GRID_X = WIDTH / 2 - 2.5 * POTION_SIDE + 20;
/** @type {string} Value for grid container y coordinate.*/
const GRID_Y = HEIGHT / 2 - 1.5 * POTION_SIDE + 30;
/** @type {string} Value for spin/stop button x coordinate.*/
const BUTTON_X = WIDTH / 2;
/** @type {string} Value for spin/stop button y coordinate.*/
const BUTTON_Y = HEIGHT / 2 + 1.5 * POTION_SIDE + 150;


export default {
    WIDTH,
    HEIGHT,
    POTION_SIDE,
    CONTAINER_X,
    CONTAINER_Y,
    GRID_X,
    GRID_Y,
    BUTTON_X,
    BUTTON_Y,
}