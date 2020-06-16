import Phaser from 'phaser';
import TitleScene from '~/js/scenes/TitleScene';
import GameScene from '~/js/scenes/GameScene';
import Measurements from '~/js/consts/Measurements.js';
import StateKeys from '~/js/consts/StateKeys';

var game;

const config = {
    width: Measurements.WIDTH,
    height: Measurements.HEIGHT,
    type: Phaser.AUTO,
    // physics: ...,
}

window.onload = () => {
    game = new Phaser.Game(config);
    game.scene.add(StateKeys.TITLE_SCENE, TitleScene);
    game.scene.add(StateKeys.GAME_SCENE, GameScene);
    game.scene.start(StateKeys.TITLE_SCENE);
}

export default game;