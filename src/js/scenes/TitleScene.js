import Phaser from 'phaser';
import StateKeys from '~/js/consts/StateKeys';
import Measurements from '~/js/consts/Measurements';
import WebFontFile from '~/js/utils/WebFontFile';

// const TITLE_FONT_SIZE = 32;
// const SUBTITLE_FONT_SIZE = 20;

const TITLE_FONT_STYLE = {
    fontSize: 32,
    fontFamily: '"Press Start 2P"',
}

const SUBTITLE_FONT_STYLE = {
    fontSize: 20,
    fontFamily: '"Press Start 2P"',
}

export default class TitleScene extends Phaser.Scene {
    constructor(){
        super(StateKeys.TITLE_SCENE)
    }

    preload = () => {
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);
    }

    create = () => {
        const { HEIGHT, WIDTH } = Measurements;
        // console.log(StateKeys.GAME_SCENE);
        this.title = this.add.text(WIDTH / 2, HEIGHT / 2, "BASIC SLOT MACHINE", TITLE_FONT_STYLE)
            .setOrigin(0.5, 1);
        this.sub_title = this.add.text(WIDTH / 2, HEIGHT / 2 + this.title.height * 1.5, "PRESS SPACE TO START", SUBTITLE_FONT_STYLE)
        .setOrigin(0.5, 1);
        console.dir(this.game);
        this.input.keyboard.once('keydown-SPACE', this.start_game);
    }

    start_game = () => this.scene.start(StateKeys.GAME_SCENE);


}