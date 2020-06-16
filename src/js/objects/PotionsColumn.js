import Potion from '~/js/objects/Potions';
import Measurements from '~/js/consts/Measurements';
import FrameNames from '~/js/consts/FrameNames';

const ROWS = 3;

export default class PotionsColumn {
    

    constructor(game_scene, finishing_frames) {
        this.finishing_frames = finishing_frames;
        this.game_scene = game_scene;
        this.create_potions_arr();
    }

    create_potions_arr = () => {
        this.potions_arr = [];
        for (let i = 0; i < ROWS; i += 1){
            this.potions_arr.push(new Potion(this.game_scene, this.finishing_frames[i]));
        }
    }

    spawn = ({x = 0, y = 0, frame = 0}) => {
        const SIDE = Measurements.POTION_SIDE;  
        const frameRate = Phaser.Math.Between(6, 10);
        for (let i = 0; i < ROWS; i += 1) {
            this.potions_arr[i].spawn({
                x,
                y:  y + SIDE * i,
                frame: (frame + i) % FrameNames.POTION_FRAMES.length,
                frameRate
            });
        }
    }

    spin = () => {
        this.potions_arr.forEach(potion => potion.spin());
    }

    stop = () => {
        for (let i = 0; i < this.potions_arr.length; i++){
            this.potions_arr[i].stop(this.finishing_frames[i]);
        }
    }

}