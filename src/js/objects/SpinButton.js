/** @file The spin/stop button class.
 *	@author Ofek Atar
 */

import SpriteNames from '~/js/consts/SpriteNames';
import FrameNames from '~/js/consts/FrameNames';
import { Game } from 'phaser';

const frames = [SpriteNames.BUTTON_SPIN, SpriteNames.BUTTON_STOP];

/** @type {number} Indices for the appropriate animation frame in the frames array. */
const SPIN = 0;
/** @type {number} Indices for the appropriate animation frame in the frames array. */
const STOP = 1;

/**
 * @type {Phaser.Types.Sound.SoundConfig} The sound configurations for
 * the machine spinning sound effect
 */
const music_config = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

/** Implements the sprite for the spin/stop button. */
export default class SpinButton extends Phaser.GameObjects.Container {
    
    /**
     * 
     * @param {Game.Scene} scene The scoping scene for this sprite.
     * @param {number} x X index to present by.
     * @param {number} y Y index to present by.
     * @param {PotionsGrid} grid Grid instance to spin and stop.
     * @param {Phaser.Sound.BaseSound} spin_sound Spinning sound effect.
     */
    constructor(scene, x = 0, y = 0, grid, spin_sound){
        
        super(scene, x, y);
        /** @type {boolean} Indicates if the machine is currently spinning. */
        this.spinning = false;
        /** @type {boolean} Indicates if the button is currently disabled. */
        this.disabled = false;
        this.spin_sound = spin_sound;
        this.x = x;
        this.y = y;
        this.grid = grid;
        /** @type {Array<string>} String keys for the button's sprites. */
        this.imgs = [];

        frames.forEach(img =>{
            const temp = scene.add.image(0, 0, img).setOrigin(0.5).setScale(2);
            this.imgs.push(temp);
            this.add(temp);
        });

        this.imgs[STOP].setVisible(false);

        this.setSize(this.imgs[SPIN].displayWidth, this.imgs[SPIN].displayHeight);

        this.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onClick);
    }

    /**
     * An event handler for the clicking event.
     */
    onClick = () => {
        if (this.disabled){
            return;
        }
        this.imgs.forEach(img => img.setVisible(!img.visible));
        if (this.spinning){
            this.handle_stop(false);
        }
        else{
            this.handle_spin();
        }
        this.spinning = !this.spinning;
    }

    /**
     * Executes methods relevant when spin button is clicked.
     */
    handle_spin = () => {        
        this.change_opacity(0.5);
        this.grid.spin();
        this.spin_sound.play(music_config);
        this.disabled = true;

        this.scene.time.delayedCall(1000, this.handle_timer_enabled, [], this.scene);
        this.delayed_stop = this.scene.time.delayedCall(2000, this.handle_timer_stop, [], this.scene);
    }

    /**
     * An event handler for re-enabling the button.
     */
    handle_timer_enabled = () => {
            this.change_opacity(1);
            this.disabled = false;
    }

    /**
     * An event handler for stopping the machine automatically.
     */
    handle_timer_stop = () => {
            this.imgs.forEach(img => img.setVisible(!img.visible));
            this.handle_timer_enabled();
            this.handle_stop();
            this.spinning = false;
    }

    /**
     * Set the button's sprites opacity value.
     * @param {nunmber} val The opacity value to set to.
     */
    change_opacity =(val) => {
        this.imgs.forEach(img => img.setAlpha(val));
    }
    
    /**
     * Executes methods relevant when stop button is clicked.
     */
    handle_stop = (automatic = true) => {
        this.grid.stop(automatic);
        this.spin_sound.stop();
        this.delayed_stop.remove(false);
    }

}