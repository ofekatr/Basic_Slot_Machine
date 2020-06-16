import SpriteNames from '~/js/consts/SpriteNames';
import FrameNames from '~/js/consts/FrameNames';

const frames = [SpriteNames.BUTTON_SPIN, SpriteNames.BUTTON_STOP];

const SPIN = 0;
const STOP = 1;

export default class SpinButton extends Phaser.GameObjects.Container {
    
    constructor(scene, x = 0, y = 0){
        super(scene, x, y);

        this.x = x;
        this.y = y;
        this.imgs = [];

        frames.forEach(img =>{
            console.log(img);
            const temp = scene.add.image(0, 0, img).setOrigin(0.5);
            this.imgs.push(temp);
            this.add(temp);
        });

        this.imgs[STOP].setVisible(false);
        // this.upImg.setVisible(false);
        // this.downImg.setVisible(false);

        this.setSize(this.imgs[SPIN].displayWidth, this.imgs[SPIN].displayHeight);
        console.log(this.imgs[SPIN].width, this.imgs[SPIN].height,)
        console.log(this.imgs[SPIN].displayWidth, this.imgs[SPIN].displayHeight,)

        this.setInteractive()
        // .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.spin)
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.spin);
    }

    spin = () => {
        this.imgs.forEach(img => img.setVisible(!img.visible));
    }

}