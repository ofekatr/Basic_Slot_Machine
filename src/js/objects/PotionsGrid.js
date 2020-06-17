/** @file The potions tiles grid class.
 *	@author Ofek Atar
 */

import Phaser from 'phaser';
import Measurements from '~/js/consts/Measurements';
import PotionsColumn from '~/js/objects/PotionsColumn';
import FrameNames from '~/js/consts/FrameNames';

/** @type {number} The number of columns in the grid. */
const COLUMNS_N = 5;
/** @type {number} */
const SIDE = Measurements.POTION_SIDE;

/** @type {Array<string>} The finishing frame key strings for each row. */
const FINISH_FRAMES = [
    FrameNames.POTION_FRAMES[0],
    FrameNames.POTION_FRAMES[2],
    FrameNames.POTION_FRAMES[3]
]

/** Implements the the potions grid sprite. */
export default class PotionsGrid {

    /**
     * Constructor.
     * @param {Phaser.Scene} gameScene The scoping scene for this sprite.
     */
    constructor(game_scene) {
        this.game_scene = game_scene;
        this.create_grid();
        this.stopping = false;        
    }

    /** Initializes the potions tiles grid. */
    create_grid = () => {
        this.grid = new Array(COLUMNS_N);
        for (let i = 0; i < COLUMNS_N; i++){
            this.grid[i] = new PotionsColumn(this.game_scene, FINISH_FRAMES);
        }
    }

    /**
     * Add and show the grid.
     * @param {{x: number, y: number}} param0 indices to present by.
     */
    spawn = ({x, y} = {x: 0, y: 0}) => {
        for (let i = 0; i < this.grid.length; i++){
            this.grid[i].spawn({
                x: x + i * SIDE,
                y,
                frame: i % FrameNames.POTION_FRAMES.length})
        }
    }

    /** Starts the spinning animation of all potions in the grid. */
    spin = () => {
        this.grid.forEach(col => col.spin());
        this.stopping = false;
    }

    /** Stops the spinning animation of all potions in the grid. */
    stop = (automatic = true) => {
        this.stopping = true;
        if (automatic){
            this.stop_iteration();
            return;
        }
        this.grid.forEach(col => col.stop());
    }

    /**
     * 
     * @param {*} i 
     */
    stop_iteration(i = 0){
        if (i >= this.grid.length || !this.stopping)
            return;
        this.grid[i].stop();
        this.game_scene.time.delayedCall(500,()=>{
                this.stop_iteration(i + 1)
            }, [], this.game_scene)
    }
}