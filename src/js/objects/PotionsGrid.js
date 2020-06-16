import Phaser from 'phaser';
import Measurements from '~/js/consts/Measurements';
import PotionsColumn from '~/js/objects/PotionsColumn';
import FrameNames from '~/js/consts/FrameNames';


const COLUMNS_N = 5;
const SIDE = Measurements.POTION_SIDE;

export default class PotionsGrid {

    constructor(game_scene) {
        this.game_scene = game_scene;
        this.create_grid();
        this.stopping = false;        
    }

    create_grid = () => {
        this.grid = new Array(COLUMNS_N);
        for (let i = 0; i < COLUMNS_N; i++){
            this.grid[i] = new PotionsColumn(this.game_scene);
        }
    }

    spawn = ({x, y} = {x: 0, y: 0}) => {
        for (let i = 0; i < this.grid.length; i++){
            this.grid[i].spawn({
                x: x + i * SIDE,
                y,
                frame: i % FrameNames.POTION_FRAMES.length})
        }
    }

    spin = () => {
        this.grid.forEach(col => col.spin());
        this.stopping = false;
    }

    stop = (i = 0) => {
        this.stopping = true;
        this.stop_iteration();
    }

    stop_iteration(i = 0){
        if (i >= this.grid.length || !this.stopping)
            return;
        this.grid[i].stop();
        this.game_scene.time.delayedCall(500,()=>{
                this.stop_iteration(i + 1)
            }, [], this.game_scene)
    }
}