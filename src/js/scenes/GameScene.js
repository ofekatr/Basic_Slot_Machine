import Phaser from 'phaser';
import StateKeys from '~/js/consts/StateKeys';
import Measurements from '~/js/consts/Measurements';
import PotionsColumn from '~/js/objects/PotionsColumn';
import Potions from '~/js/objects/Potions';
import PotionsGrid from '../objects/PotionsGrid';

// const TITLE_FONT_SIZE = 32;
// const SUBTITLE_FONT_SIZE = 20;
export default class GameScene extends Phaser.Scene {
    constructor(){
        super(StateKeys.GAME_SCENE)
    }

    preload(){
    }
    
    create() {
        const { HEIGHT, WIDTH } = Measurements;
        const x = 0, y = 0;
        // this.potions = new Potions(this);
        // this.potions.spawn({x: 100, y: 100, frame: 3});
        // this.potions.spin();
        // this.potions_arr = new PotionsColumn(this);
        // this.potions_arr.spawn({x: 100, y: 30});
        // this.potions_arr.spin();
        this.potions_grid = new PotionsGrid(this);
        this.potions_grid.spawn();
        this.potions_grid.spin();
    }
}