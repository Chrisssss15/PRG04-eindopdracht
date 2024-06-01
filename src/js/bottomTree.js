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
        this.speed = 200; // snelheid van de boom begint bij 200

        this.acceleration = 20;// snelheid wordt verhoogd met 20 per seconde
    }

    onInitialize(engine) {
        this.graphics.use(Resources.BottomTree.toSprite());
        this.pos = new Vector(1000, 600);
    
    }

    onPostUpdate(engine, delta) {
        // verhoog elke keer de snelheid
        this.speed += this.acceleration * delta / 1000;
        // console.log('Speed:', this.speed)

        this.pos.x -= this.speed * delta / 1000; //beweeeg de boom van rechts -> links

        // als de boom van het scherm afgaat, zet de boom weer op de rechterkant
        if (this.pos.x + this.width < 0) {
            this.pos.x = engine.drawWidth;
        }
    }
}
