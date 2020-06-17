/** @file The background scene class.
 *	@author Ofek Atar
 */

import Phaser from 'phaser';
import SpriteNames from '~/js/consts/SpriteNames';
import StateKeys from '~/js/consts/StateKeys';

/** Implements the background scene for the game. */
export default class BackgroundScene extends Phaser.Scene {
    
    create() {
        this.bg = this.add.sprite(0, 0, SpriteNames.BACKGROUND).setOrigin(0);
    }
}