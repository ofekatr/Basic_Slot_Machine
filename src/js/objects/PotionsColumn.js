/** @file The potions tiles column class.
 *	@author Ofek Atar
 */

import Potion from '~/js/objects/Potions';
import Measurements from '~/js/consts/Measurements';
import FrameNames from '~/js/consts/FrameNames';
import SpriteNames from '~/js/consts/SpriteNames';

/** @type {number} The number of rows in the column. */
const ROWS = 3;

/** Implements the sprite for a single potions tiles column in the potions grid. */
export default class PotionsColumn {
    
    /**
     * Constructor.
     * @param {number} x X coordinate to present by.
     * @param {number} y Y coordinate to present by.
     * @param {Phaser.Scene} game_scene The scoping scene for this sprite.
     * @param {number} finishing_frames The index of the frame to stop animation on.
     */
    constructor(x = 0, y = 0, game_scene, finishing_frames) {
        this.x = x;
        this.y = y;
        this.finishing_frames = finishing_frames;
        this.game_scene = game_scene;
        this.create_potions_arr();
    }

    /** Initializes the potions tiles column. */
    create_potions_arr = () => {
        this.potions_arr = [];
        for (let i = 0; i < ROWS; i += 1){
            this.potions_arr.push(new Potion(this.game_scene, this.finishing_frames[i]));
        }
    }

    /**
     * Add and show the column.
     * @param {{x: number, y: number, frame: number}} param0 indices and an animation frame to present by.
     */
    spawn = ({x = 0, y = 0, frame = 0}) => {
        /** @type {number} */
        const SIDE = Measurements.POTION_SIDE;  
        /** @type {number} A frame rate generated randomly between 6 - 10. */
        const frameRate = Phaser.Math.Between(6, 10);
        for (let i = 0; i < ROWS; i += 1) {
            this.potions_arr[i].spawn({
                x,
                y:  y + SIDE * i,
                frame: (frame + i) % FrameNames.POTION_FRAMES.length,
                frameRate
            });
        }
    }

    /** Starts the spinning animation of all potions in the column. */
    spin = () => {
        this.potions_arr.forEach(potion => potion.spin());
    }

    /** Stops the spinning animation of all potions in the column. */
    stop = () => {
        for (let i = 0; i < this.potions_arr.length; i++){
            this.potions_arr[i].stop(this.finishing_frames[i]);
        }
    }

}