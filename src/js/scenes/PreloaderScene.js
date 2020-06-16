import Phaser from 'phaser';
import StateKeys from '~/js/consts/StateKeys';
import WebFontFile from '~/js/utils/WebFontFile';
import SpriteNames from '~/js/consts/SpriteNames';

import background_url from '~/assets/background.png';
import container_url from '~/assets/container.png';
import potions_url from '~/assets/potions.png';
import potions_atlas_url from '~/assets/potions.json';

const font_name = 'Press Start 2P';

export default class PreloaderScene extends Phaser.Scene {
    preload() {
        this.load_images();
        const fonts = new WebFontFile(this.load, font_name);
        this.load.addFile(fonts);
    }

    load_images = () => {
        // console.log(SpriteNames);
        // console.log(SpriteNames.BACKGROUND);
        this.load.image(SpriteNames.BACKGROUND, background_url);
        this.load.image(SpriteNames.CONTAINER, container_url);
        this.load.atlas(SpriteNames.POTIONS, potions_url, potions_atlas_url);
    }

    create() {
        this.scene.start(StateKeys.TITLE_SCENE);
    }
}