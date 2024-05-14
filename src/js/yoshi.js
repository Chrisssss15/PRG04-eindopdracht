import { Actor, Keys, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";

export class Yoshi extends Actor {

    constructor() {
        super(
            {
                width: 64,
                height: 64
            }
        );
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Yoshi.toSprite());
        this.scale = new Vector(0.2, 0.2);
        this.pos = new Vector(400, 300);
        // this.vel = new Vector(-10,0);
    }
    
    onPostUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
        let sprite = this.graphics.current;


        if(engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -100;
            if(sprite) sprite.flipVertical = false;
        }

        if(engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 100;
            if(sprite) sprite.flipVertical = true;
        }

        if(engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -100;
            if(sprite) sprite.flipHorizontal = false;
        }

        if(engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 100;
            if(sprite) sprite.flipHorizontal = true;
        }

        this.vel = new Vector(xspeed, yspeed);
    }
}