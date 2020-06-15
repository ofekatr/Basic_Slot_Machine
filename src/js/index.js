import Phaser from 'phaser';

var game;

const config = {
    width: 600,
    height: 800,
    type: Phaser.AUTO,
    // scene: ... ,
    // physics: ...,
}

window.onload = () => {
    game = new Phaser.Game(config);
}

export default game;