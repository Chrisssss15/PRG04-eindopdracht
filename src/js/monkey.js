import { Actor, CollisionType, Keys, Vector, clamp } from "excalibur";
import { Resources } from "./resources";
import { TopTree } from "./topTree";
import { BottomTree } from "./bottomTree";
import { Bullet } from "./bullet";
import { Coin } from "./coin";

export class Monkey extends Actor {
    constructor(game) {
        super({
            width: 200,
            height: 250,
            name: 'monkey',
            collisionType: CollisionType.Active
        });
        this.game = game;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Monkey.toSprite());
        this.scale = new Vector(0.4, 0.4);
        this.pos = new Vector(200, 350);

        this.on('collisionstart', (event) => this.hitSomething(event, engine));
    }

    
    hitSomething(event, engine) {
        if (event.other instanceof TopTree || event.other instanceof BottomTree) {
            console.log("hit the tree");

            // Sla de gamegegevens op
            this.game.saveGameData();

            // Ga naar de endScene
            // engine.goToScene('endScene');

            // Go to endScene
            const endScene = engine.scenes['endScene']; 
            if (endScene && typeof endScene.endGame === 'function') {
                endScene.endGame(engine);
            }
            engine.goToScene('endScene');
        }
    }

    shoot(engine) {
        const bullet = new Bullet(this.pos.clone());
        engine.add(bullet);
    }

    onPostUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -500;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 500;
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -500;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 500;
        }

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot(engine);
        }

        this.vel = new Vector(xspeed, yspeed);

        this.pos.x = clamp(this.pos.x, 0, engine.drawWidth - this.width);
        this.pos.y = clamp(this.pos.y, 0, engine.drawHeight - this.height);
    }
}
