/** @file Implements the background scene for the game.
 *	@author Ofek Atar
 */

import Phaser from 'phaser';
import SpriteNames from '~/js/consts/SpriteNames';
import StateKeys from '~/js/consts/StateKeys';

export default class BackgroundScene{
    
    create() {
        this.bg = this.add.sprite(0, 0, SpriteNames.BACKGROUND).setOrigin(0);
    }
}