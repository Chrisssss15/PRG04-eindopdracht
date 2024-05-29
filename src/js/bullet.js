import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources";
import { Coin } from "./coin"; // Zorg ervoor dat deze import bestaat

export class Bullet extends Actor {
    constructor(pos) {
        super({
            width: 250,
            height: 250,
            name: 'bullet',
            collisionType: CollisionType.Passive
        });
        this.pos = pos; // Startpositie van de kogel
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bullet.toSprite());
        this.scale = new Vector(0.075, 0.075);
        this.vel = new Vector(500, 0); // Snelheid van de kogel naar rechts

        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Coin) {
            // console.log("Bullet or monkey hit the coin"); (MISSCHIEN OVERBODDIG?)
            event.other.kill(); // Kill the coin
            this.kill(); // Kill the bullet
        }
    }

    onPostUpdate(engine, delta) {
        // Verwijder de kogel als deze buiten het scherm gaat
        if (this.pos.x > engine.drawWidth || this.pos.x < 0) {
            this.kill();
        }
    }
}
