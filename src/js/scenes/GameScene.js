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

export default class GameScene extends Phaser.Scene {
    constructor(){
        super(StateKeys.GAME_SCENE)
    }

    preload = () => {
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);
    }

    create = () => {
        const { HEIGHT, WIDTH } = Measurements;
        console.log("a");

        this.title = this.add.text(WIDTH / 2, HEIGHT / 2, "LET THE GAME BEGIN", TITLE_FONT_STYLE)
            .setOrigin(0.5, 1);
    }


}