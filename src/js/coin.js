import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from "./resources";
import { Monkey } from "./monkey";
import { Bullet } from "./bullet"; // Zorg ervoor dat deze import bestaat

export class Coin extends Actor {
    constructor(Game) {
        super({
            width: 1250,
            height: 1250,
            name: 'coin',
            collisionType: CollisionType.Passive
        });
        this.game = Game; // Store a reference to the Game instance
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Coin.toSprite());
        this.setRandomPosition();
        this.scale = new Vector(0.075, 0.075);

        this.on('collisionstart', (event) => this.hitSomething(event, engine));
    }

    setRandomPosition() {
        const randomX = 200 + Math.random() * (1280 - 200); // X-positie tussen 200 en 1280
        const randomY = Math.random() * (700 - 10); // Y-positie tussen 10 en 700

        this.pos = new Vector(randomX, randomY);
    }

    hitSomething(event, engine) {
        if (event.other instanceof Monkey ) {
            console.log("Coin hit by Monkey");
            this.game.addPoints(); // Add points
            this.kill(); // Remove the coin after collision

            // Direct een nieuwe coin toevoegen
            const newCoin = new Coin(this.game);
            engine.add(newCoin);
        }

        if (event.other instanceof Bullet) {
            console.log("Coin hit by Bullet");
            // event.other.kill(); // Remove the bullet if it hit the coin
            this.game.addPoints(); // Add points
            this.kill(); // Remove the coin after collision

            // Direct een nieuwe coin toevoegen
            const newCoin = new Coin(this.game);
            engine.add(newCoin);
        }
    }
}
