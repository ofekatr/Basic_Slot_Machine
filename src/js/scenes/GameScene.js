/** @file The game scene for the game.
 *	@author Ofek Atar
 */

import Phaser from 'phaser';
import StateKeys from '~/js/consts/StateKeys';
import Measurements from '~/js/consts/Measurements';
import SoundNames from '~/js/consts/SoundNames';
import PotionsGrid from '../objects/PotionsGrid';
import PotionsColumn from '../objects/PotionsColumn';
import SpriteNames from '../consts/SpriteNames';
import SpinButton from '../objects/SpinButton';
import PotionsTable from '../objects/PotionsTable';

/**
 * @type {Phaser.Types.Sound.SoundConfig} The sound configurations for
 * the background music.
 */
const bg_music_config = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

/**
 * Implements the game scene for the game.
 */
export default class GameScene extends Phaser.Scene {

    /**
     * Constructor.
     */
    constructor(){
        super(StateKeys.GAME_SCENE)
    }

    create() {
        /** @type {number} Several measurements. */
        const { HEIGHT, WIDTH, POTION_SIDE, CONTAINER_X, CONTAINER_Y,
                GRID_X, GRID_Y, BUTTON_X, BUTTON_Y 
            } = Measurements;

        /** Add background scene. */
        this.scene.run("BackgroundScene");
        this.scene.sendToBack(StateKeys.BACKGROUND_SCENE);
        

        /** Add grid background music. */
        this.bg_music = this.sound.add(SoundNames.BACKGROUND);
        this.bg_music.play(bg_music_config);

        /** Add grid container sprite. */
        this.container = this.add.sprite(CONTAINER_X, CONTAINER_Y, SpriteNames.CONTAINER)

        this.table = new PotionsTable(GRID_X, GRID_Y, this);

        /** Add spinning sound effect. */
        this.spin_sound = this.sound.add(SoundNames.SPIN);

        // /** Add potions tiles grid sprite. */
        // this.potions_grid = new PotionsGrid(this);
        // this.potions_grid.spawn({x: GRID_X, y: GRID_Y});

        /** Add spin/stop button. */
        this.button = new SpinButton(this, BUTTON_X, BUTTON_Y,  this.table, this.spin_sound);
        this.add.existing(this.button);
    }

    update() {
        this.table.spin();
    }
}