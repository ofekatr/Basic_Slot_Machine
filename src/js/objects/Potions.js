/** @file The potions tile class.
 *	@author Ofek Atar
 */

import SpriteNames from '~/js/consts/SpriteNames';
import AnimationNames from '~/js/consts/AnimationNames';
import FrameNames from '~/js/consts/FrameNames';
import ArrayMethods from '~/js/utils/ArrayMethods';

/** @type {number} An instances counter, for animation key strings purposes.*/
let counter = 0;

/**
 * Implements the sprite for a single potions tile in the potions grid.
 */
export default class Potions{
    /**
     * Constructor
     * @param {Phaser.Scene} gameScene The scoping scene for this sprite.
     */
    constructor(gameScene){
        this.game_scene = gameScene;
    }

    /**
     * Add and show the column.
     * @param {{x: number, y: number, frame: number}} param0 indices and an animation frame to present by.
     */
    spawn = ({x = 0, y = 0, frame = 0, frameRate = 1}) => {
        this.first_frame_i = frame;
        this.frameRate = frameRate;
        this.potions = this.game_scene.add.sprite(x, y, SpriteNames.POTIONS, FrameNames.POTION_FRAMES[this.first_frame_i])
        .setOrigin(0, 0);
        this.create_animation();
    }

    /**
     * Create the spinning animation.
     */
    create_animation = () => {
        this.anim = this.game_scene.anims.create({
            key: AnimationNames.POTION_SPIN + (counter++),
            frames: this.get_frames(),
            frameRate: this.frameRate,
            repeat: -1,
        });
    }

    /**
     * Generate the spinning animation frames array for this potions tile.
     * @returns The generated frames array.
     */
    get_frames = () => {
        /** @type {number} The number of rotations for the array. */
        const rotations_n = FrameNames.POTION_FRAMES.length - this.first_frame_i;
        /** @type {Array<string>} A copy of the spinning animation frames key strings. */
        let temp_arr = [...FrameNames.POTION_FRAMES];
        temp_arr = ArrayMethods.rotate(temp_arr, rotations_n).reverse();
        /** @type {Array<Phaser.Animations.AnimationFrame>} The spinning animation frames array. */
        const frames_arr = new Array(temp_arr.length);
        for (let i = 0; i < frames_arr.length; i++){
            frames_arr[i] = { key: SpriteNames.POTIONS, frame: temp_arr[i]};
        }
        return frames_arr;
    }

    /** Starts the spinning animation of this potions tile. */
    spin = () => {
        this.potions.play(this.anim.key);
    }

    /** Stops the spinning animation of this potions tile. */
    stop = (frame_str) => {
        /** @type {number} index of the given frame key string in this animations's frames array. */
        const index = this.get_frames().findIndex(f => f.frame === frame_str);
        if (index === -1){
            this.potions.stop();
            return;
        }
        /** @type {Phaser.Animations.AnimationFrame} The frame to be stopped on.*/
        const frame = this.potions.anims.currentAnim.frames[index];
        this.potions.anims.stopOnFrame(frame);
    }
}