import Measurements from '~/js/consts/Measurements';
import SpriteNames from '~/js/consts/SpriteNames';

export default class PotionsTable {

    constructor(x = 0, y = 0, scene){
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.create_columns();
    }

    create_columns = () => {
        const POTION_SIDE = Measurements.POTION_SIDE;
        this.columns = new Array(5);
        for (let i = 0; i < this.columns.length; i++){
            this.columns[i] = {
                sprite: this.scene.add.tileSprite(this.x + i * POTION_SIDE, this.y, POTION_SIDE, 3 * POTION_SIDE,
                SpriteNames.POTIONS_COLUMN).setOrigin(0),
                stopped: true,
            }
            this.columns[i].sprite.tilePositionY = Phaser.Math.Between(1, POTION_SIDE * 3);
        }
        this.create_velocities();
    }

    create_velocities = () => {
        this.columns.forEach(col => col.velocity = Phaser.Math.Between(80, 120));
    }

    spin = () => {
        this.columns.forEach(col => { if(!col.stopped) col.sprite.tilePositionY -= col.velocity });
    }

    start = () => {
        if (this.can_spin())
            this.columns.forEach(col => col.stopped = false);
        this.columns.forEach(col => console.log(col.stopped));
    }

    can_spin = () => {
        return this.columns.every(col => col.stopped);
    }

    stop = (automatic = true) => {
        if (!automatic) {
            this.columns.forEach(col => {
                col.stopped = true
                col.sprite.tilePositionY = 0;
                console.log("Manual", col.stopped);
            });
        }
    
        const loop = (i = 0) => {
            if (i >= this.columns.length || this.columns[i].stopped){
                return;
            }
            this.columns[i].stopped = true;
            this.columns[i].sprite.tilePositionY = 0;
            setTimeout(()=>loop(i + 1), 500);
        }
        loop();
    }

    // loop = (i = 0) => {
    //     if (i >= this.columns.length){
    //         console.log("what");
    //         return;
    //     }
    //     else {
    //         this.columns[i].stopped = true;
    //         setInterval(()=>this.loop(i + 1), 500);
    //     }
    // }
}