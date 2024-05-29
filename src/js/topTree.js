import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources";

export class TopTree extends Actor{
    constructor(){
        super({
            width: 350,
            height: 400,
            name: 'boom Boven',
            collisionType: CollisionType.Fixed
        });
        this.speed = 200; // Speed at which the tree moves to the left
        this.acceleration = 10; // Rate at which the speed increases

    }   

    onInitialize(engine){
        this.graphics.use(Resources.TopTree.toSprite());
        this.pos = new Vector(500, 150);
        this.scale = new Vector(0.6, 0.6);
    }

    onPostUpdate(engine, delta) {
        // Increase the speed over time
        this.speed += this.acceleration * delta / 1000;
        // Move the tree to the left
        this.pos.x -= this.speed * delta / 1000;

        // If the tree goes off the left side of the screen, reset its position to the right
        if (this.pos.x + this.width < 0) {
            this.pos.x = engine.drawWidth;
        }
    }
}

