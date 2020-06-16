import SpriteNames from '~/js/consts/SpriteNames';
import FrameNames from '~/js/consts/FrameNames';

const frames = [SpriteNames.BUTTON_SPIN, SpriteNames.BUTTON_STOP];

const SPIN = 0;
const STOP = 1;

const music_config = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

export default class SpinButton extends Phaser.GameObjects.Container {
    
    constructor(scene, x = 0, y = 0, grid, spin_sound){
        
        super(scene, x, y);

        this.spinning = false;
        this.disabled = false;
        this.spin_sound = spin_sound;
        this.x = x;
        this.y = y;
        this.grid = grid;
        this.imgs = [];

        frames.forEach(img =>{
            const temp = scene.add.image(0, 0, img).setOrigin(0.5).setScale(2);
            this.imgs.push(temp);
            this.add(temp);
        });

        this.imgs[STOP].setVisible(false);
        // this.upImg.setVisible(false);
        // this.downImg.setVisible(false);

        this.setSize(this.imgs[SPIN].displayWidth, this.imgs[SPIN].displayHeight);

        this.setInteractive()
        // .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.spin)
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onClick);
    }

    onClick = () => {
        if (this.disabled){
            return;
        }
        this.imgs.forEach(img => img.setVisible(!img.visible));
        if (this.spinning){
            this.handle_stop(false);
        }
        else{
            this.handle_spin();
        }
        this.spinning = !this.spinning;
    }

    handle_spin = () => {        
        this.change_opacity(0.5);
        this.grid.spin();
        this.spin_sound.play(music_config);
        this.disabled = true;

        this.scene.time.delayedCall(1000, this.handle_timer_enabled, [], this.scene);
        this.delayed_stop = this.scene.time.delayedCall(2000, this.handle_timer_stop, [], this.scene);
    }

    handle_timer_enabled = () => {
            this.change_opacity(1);
            this.disabled = false;
    }

    handle_timer_stop = () => {
            this.imgs.forEach(img => img.setVisible(!img.visible));
            this.handle_timer_enabled();
            this.handle_stop();
            this.spinning = false;
    }

    change_opacity =(val) => {
        this.imgs.forEach(img => img.setAlpha(val));
    }

    handle_stop = (automatic = true) => {
        this.grid.stop(automatic);
        this.spin_sound.stop();
        this.delayed_stop.remove(false);
    }

}