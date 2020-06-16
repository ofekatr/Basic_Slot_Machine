import Phaser from 'phaser';
import StateKeys from '~/js/consts/StateKeys';
import Measurements from '~/js/consts/Measurements';

// const TITLE_FONT_SIZE = 32;
// const SUBTITLE_FONT_SIZE = 20;

const TITLE_FONT_STYLE = {
    fontSize: 32,
    fontColor: 0x4AF626,
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

    create() {
        const { HEIGHT, WIDTH } = Measurements;

        this.title = this.add.text(WIDTH / 2, HEIGHT / 2, "BASIC SLOT MACHINE", TITLE_FONT_STYLE)
            .setColor('#4AF626')
            .setOrigin(0.5, 1);

        this.sub_title = this.add.text(WIDTH / 2, HEIGHT / 2 + this.title.height * 1.5, "PRESS SPACE TO START", SUBTITLE_FONT_STYLE)
        .setColor('#4AF626')
        .setOrigin(0.5, 1);
        this.input.keyboard.once('keydown-SPACE', this.start_game);
    }

    start_game = () => this.scene.start(StateKeys.GAME_SCENE)


}