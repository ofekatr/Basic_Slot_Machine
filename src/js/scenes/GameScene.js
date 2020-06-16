import Phaser from 'phaser';
import StateKeys from '~/js/consts/StateKeys';
import Measurements from '~/js/consts/Measurements';
import SoundNames from '~/js/consts/SoundNames';
// import PotionsGrid from '../objects/PotionsGrid';
// import SpriteNames from '../consts/SpriteNames';
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
        const { HEIGHT, WIDTH } = Measurements;
        const x = 0, y = 0;

        // this.button = this.add.sprite(100, 30, SpriteNames.BUTTON, 0).setOrigin(0);
        this.button = new SpinButton(this, 100, 30, 'button_01.png', 'button_02.png');
        this.add.existing(this.button);
        // this.button.spawn();

        this.bg_music = this.sound.add(SoundNames.BACKGROUND);
        this.bg_music.play(bg_music_config);

        this.spin_sound = this.sound.add(SoundNames.SPIN);
        this.spin_sound.play(bg_music_config);

        // this.potions_grid = new PotionsGrid(this);
        // this.potions_grid.spawn();
        // this.potions_grid.spin();
    }
}