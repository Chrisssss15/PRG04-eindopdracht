import { Actor, CollisionType, Keys, Vector, clamp } from "excalibur";
import { Resources } from "./resources";
import { TopTree } from "./topTree";
import { BottomTree } from "./bottomTree";
import { Bullet } from "./bullet";
import { Coin } from "./coin";

export class Monkey extends Actor {
    constructor() {
        super({
            width: 200,
            height: 250,
            name: 'monkey',
            collisionType: CollisionType.Active
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Monkey.toSprite());
        this.scale = new Vector(0.4, 0.4);
        this.pos = new Vector(200, 350);

        this.on('collisionstart', (event) => this.hitSomething(event, engine));


    }

    // // Deze functie wordt aangeroepen wanneer de aap iets raakt
    // hitSomething(event, engine) {
    //     if (event.other instanceof TopTree || event.other instanceof BottomTree) {
    //         console.log("hit the tree");

    //         // Sla de gamegegevens op
    //         engine.saveGameData();

    //         engine.stop(); // Stopt het spel
    //         // alert("Game Over!"); // Optioneel: toont een bericht aan de gebruiker
    //         // engine.restartGame(); // Herstart het spel


    //     }
    // }

    hitSomething(event, engine) {
        if (event.other instanceof TopTree || event.other instanceof BottomTree) {
            console.log("hit the tree");
    
            // Sla de gamegegevens op
            engine.saveGameData();
    
            // // Ga naar de EndScene
            // engine.goToScene('endScene');

            // Roep de endGame functie aan
            engine.endGame();
        }
    }

    shoot(engine) {
        // Maak een nieuwe kogel en voeg deze toe aan de engine
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

        // Controleer of de spatiebalk is ingedrukt en of deze nog niet eerder is verwerkt
        if (engine.input.keyboard.wasPressed(Keys.Space)) { //  
            this.shoot(engine);
        }

        this.vel = new Vector(xspeed, yspeed);

        this.pos.x = clamp(this.pos.x, 0, engine.drawWidth - this.width);
        this.pos.y = clamp(this.pos.y, 0, engine.drawHeight - this.height);
    }
}

