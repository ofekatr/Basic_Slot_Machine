import SpriteNames from '~/js/consts/SpriteNames';
import AnimationNames from '~/js/consts/AnimationNames';
import FrameNames from '~/js/consts/FrameNames';
import ArrayMethods from '~/js/utils/ArrayMethods';


export default class Potions{
    constructor(gameScene){
        this.game_scene = gameScene;
    }

    spawn = ({x = 0, y = 0, frame = 0}) => {
        this.first_frame_i = frame;
        this.potions = this.game_scene.add.sprite(x, y, SpriteNames.POTIONS, FrameNames.POTION_FRAMES[this.first_frame_i])
        .setOrigin(0, 0);
        this.create_animation();
    }

    create_animation = () => {
        this.anim = this.game_scene.anims.create({
            key: AnimationNames.POTION_SPIN + this.first_frame_i,
            frames: this.get_frames(),
            frameRate: Phaser.Math.Between(10, 15),
            repeat: -1,
        });
    }

    get_frames = () => {
        const rotations_n = FrameNames.POTION_FRAMES.length - this.first_frame_i;
        let temp_arr = [...FrameNames.POTION_FRAMES];
        temp_arr = ArrayMethods.rotate(temp_arr, rotations_n);
        const frames_arr = new Array(temp_arr.length);
        for (let i = 0; i < frames_arr.length; i++){
            frames_arr[i] = { key: SpriteNames.POTIONS, frame: temp_arr[i]};
        }
        return frames_arr;
    }
    spin = () => {
        this.potions.play(this.anim.key);
    }

    stop = (frame) => {
        this.potions.anims.stop();
    }
}