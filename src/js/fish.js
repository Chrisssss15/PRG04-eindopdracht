import { Actor, Vector } from "excalibur"
import { Resources } from "./resources"

export class Fish extends Actor {
    
    onInitialize(engine) {
        this.graphics.use(Resources.Car.toSprite())
        this.pos = new Vector(400, 300)
        this.vel = new Vector(-10,0)
    }
}