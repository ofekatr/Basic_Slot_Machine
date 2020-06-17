/** @file The loading scene class.
 *	@author Ofek Atar
 */

import Phaser from 'phaser';
import StateKeys from '~/js/consts/StateKeys';
import WebFontFile from '~/js/utils/WebFontFile';
import SpriteNames from '~/js/consts/SpriteNames';
import SoundNames from '~/js/consts/SoundNames';

import background_img_url from '~/assets/background.png';
import container_url from '~/assets/container.png';

import potions_url from '~/assets/potions.png';
import potions_atlas_url from '~/assets/potions.json';

import button_spin_url from '~/assets/button_01.png';
import button_stop_url from '~/assets/button_02.png';

import background_music_url from '~/assets/BG_Music.wav';
import spin_sound_url from '~/assets/Spin.wav';

/** @type {string} The font name. */
const font_name = 'Press Start 2P';

/**
 * Implements the loading scene for the game - includes a loading bar.
 */
export default class PreloaderScene extends Phaser.Scene {

    preload = () => {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 150, 320, 50);
        
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 160, height / 2 - 145, 300 * value, 40);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load_images();
        this.load_audio();
        const fonts = new WebFontFile(this.load, font_name);
        this.load.addFile(fonts);
    }

    /**
     * Loads the audio files to the game.
     */
    load_audio = () => {
        this.load.audio(SoundNames.BACKGROUND, background_music_url);
        this.load.audio(SoundNames.SPIN, spin_sound_url);
    }

    /** Loads the image files to the game. */
    load_images = () => {
        this.load.image(SpriteNames.BACKGROUND, background_img_url);
        this.load.image(SpriteNames.CONTAINER, container_url);
        this.load.image(SpriteNames.BUTTON_SPIN, button_spin_url);
        this.load.image(SpriteNames.BUTTON_STOP, button_stop_url);
        this.load.atlas(SpriteNames.POTIONS, potions_url, potions_atlas_url);
    }

    create() {
        this.scene.start(StateKeys.TITLE_SCENE);
    }
}