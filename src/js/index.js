import Phaser from 'phaser';
import TitleScene from '~/js/scenes/TitleScene';
import GameScene from '~/js/scenes/GameScene.js';
import PreloaderScene from '~/js/scenes/PreloaderScene.js';
import BackgroundScene from '~/js/scenes/BackgroundScene.js';
import Measurements from '~/js/consts/Measurements.js';
import StateKeys from '~/js/consts/StateKeys.js';

var game;

const config = {
    width: Measurements.WIDTH,
    height: Measurements.HEIGHT,
    type: Phaser.AUTO,
    // physics: ...,
}

game = new Phaser.Game(config);
console.log(StateKeys.BACKGROUND_SCENE);
game.scene.add(StateKeys.TITLE_SCENE, TitleScene);
game.scene.add(StateKeys.BACKGROUND_SCENE, BackgroundScene);
game.scene.add(StateKeys.GAME_SCENE, GameScene);
game.scene.add(StateKeys.PRELOADER_SCENE, PreloaderScene);
game.scene.start(StateKeys.PRELOADER_SCENE);

export default game;