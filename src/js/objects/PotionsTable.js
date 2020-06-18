/** @file The potions tiles table class.
 *	@author Ofek Atar
 */

import Measurements from '~/js/consts/Measurements';
import SpriteNames from '~/js/consts/SpriteNames';

/** @type {number} The number of columns in the grid. */
const COLUMNS_N = 5;
/** @type {number} */
const POTION_SIDE = Measurements.POTION_SIDE;

/** Implements the the potions table sprite. */
export default class PotionsTable {

    /**
     * Constructor.
     * @param {number} x X coordinate to present by.
     * @param {number} y Y coordinate to present by.
     * @param {Phaser.Scene} game_scene The scoping scene for this sprite.
     */
    constructor(x = 0, y = 0, scene){
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.create_columns();
    }

    /** Initializes the potions table. */
    create_columns = () => {
        this.columns = new Array(5);
        for (let i = 0; i < this.columns.length; i++){
            this.columns[i] = {
                sprite: this.scene.add.tileSprite(this.x + i * POTION_SIDE, this.y, POTION_SIDE, 3 * POTION_SIDE,
                SpriteNames.POTIONS_COLUMN).setOrigin(0),
                stopped: true,
            }
            this.columns[i].sprite.tilePositionY = Phaser.Math.Between(1, POTION_SIDE * 3);
        }
        this.create_velocities();
    }

    /** Initializes the columns spinning velocities. */
    create_velocities = () => {
        this.columns.forEach(col => col.velocity = Phaser.Math.Between(80, 120));
    }

    /**
     * Execute a single frame of the spinning effect.
     */
    spin = () => {
        this.columns.forEach(col => { if(!col.stopped) col.sprite.tilePositionY -= col.velocity });
    }

    /**
     * Start the spinning effect.
     */
    start = () => {
        if (this.can_spin())
            this.columns.forEach(col => col.stopped = false);
        this.columns.forEach(col => console.log(col.stopped));
    }

    /**
     * Checks if the table is ready to start spinning.
     */
    can_spin = () => {
        return this.columns.every(col => col.stopped);
    }

    /**
     * Stops the spinning differently depending on whether
     * it was stopped manually or automatically.
     * @param {boolean} automatic 
     */
    stop = (automatic = true) => {
        if (!automatic) {
            this.columns.forEach(col => {
                col.stopped = true
                col.sprite.tilePositionY = 0;
                console.log("Manual", col.stopped);
            });
        }
    
        const loop = (i = 0) => {
            if (i >= this.columns.length || this.columns[i].stopped){
                return;
            }
            this.columns[i].stopped = true;
            this.columns[i].sprite.tilePositionY = 0;
            setTimeout(()=>loop(i + 1), 500);
        }
        loop();
    }

}