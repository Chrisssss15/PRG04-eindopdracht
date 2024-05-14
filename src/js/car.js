import { Actor, Vector } from "excalibur"
import { Resources } from "./resources"

export class Car extends Actor {
    
    onInitialize(engine) {
        this.graphics.use(Resources.Car.toSprite());
        this.pos = new Vector(400, 300);
        this.vel = new Vector(-10,0);
        this.on('collisionstart' , (event) => this.onCollision(event));
    }

    onCollision(event) {
        event.other.kill();
    }
}