import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources";

export class BottomTree extends Actor {
    constructor() {
        super({
            width: 100,
            height: 275,
            name: 'Boom beneden',
            collisionType: CollisionType.Fixed  // Changed from Passive to Fixed
        });
        this.speed = 200; // Initial speed of the tree
        this.acceleration = 20; // Rate at which the speed increases
    }

    onInitialize(engine) {
        this.graphics.use(Resources.BottomTree.toSprite());
        this.pos = new Vector(1000, 600);
    
    }

    onPostUpdate(engine, delta) {
        // Increase the speed over time
        this.speed += this.acceleration * delta / 1000;
        // console.log('Speed:', this.speed)

        // Move the tree to the left
        this.pos.x -= this.speed * delta / 1000;

        // If the tree goes off the left side of the screen, reset its position to the right
        if (this.pos.x + this.width < 0) {
            this.pos.x = engine.drawWidth;
        }
    }
}
