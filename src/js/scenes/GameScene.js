import Phaser from 'phaser';
import StateKeys from '~/js/consts/StateKeys';
import Measurements from '~/js/consts/Measurements';
import SoundNames from '~/js/consts/SoundNames';
import PotionsGrid from '../objects/PotionsGrid';
import SpriteNames from '../consts/SpriteNames';
import SpinButton from '../objects/SpinButton';

const bg_music_config = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

export default class GameScene extends Phaser.Scene {
    constructor(){
        super(StateKeys.GAME_SCENE)
    }

    preload(){
    }

    create() {
        const { HEIGHT, WIDTH, POTION_SIDE, CONTAINER_X, CONTAINER_Y,
                GRID_X, GRID_Y, BUTTON_X, BUTTON_Y 
            } = Measurements;

        this.scene.run("BackgroundScene");
        this.scene.sendToBack("BackgroundScene");
        // this.scene.run(StateKeys.BACKGROUND_SCENE);
        this.scene.sendToBack(StateKeys.BACKGROUND_SCENE);

        this.container = this.add.sprite(CONTAINER_X, CONTAINER_Y, SpriteNames.CONTAINER)

        this.bg_music = this.sound.add(SoundNames.BACKGROUND);
        this.bg_music.play(bg_music_config);

        this.spin_sound = this.sound.add(SoundNames.SPIN);

        this.potions_grid = new PotionsGrid(this);
        this.potions_grid.spawn({x: GRID_X, y: GRID_Y});

        this.button = new SpinButton(this, BUTTON_X, BUTTON_Y,  this.potions_grid, this.spin_sound);
        this.add.existing(this.button);
    }
}