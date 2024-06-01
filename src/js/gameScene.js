import { Actor, Scene, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";
import { Monkey } from "./monkey";
import { Obstacles } from "./obstacles";
import { UI } from "./ui";
import { Coin } from "./coin";

export class GameScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize(engine) {
        this.createBackground(engine);
        this.runGame(engine);
    }

    createBackground(engine) { //maakt de achtergrond aan
        const sprite = new Sprite({ image: Resources.Background });
        const actor = new Actor({ pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2) });
        actor.graphics.use(sprite);
        actor.scale = new Vector(0.75, 0.75);
        this.add(actor);
    }

    runGame(engine) {
        console.log("Game is running");

        const monkey = new Monkey(this.game);
        engine.add(monkey);

        const obstacles = new Obstacles();
        engine.add(obstacles);

        this.addCoin(engine);

        this.game.ui = new UI(); 
        engine.add(this.game.ui); 
    }

    addPoints() {
        if (this.game.ui) {
            this.game.ui.updateScore();
        }
    }

    addCoin(engine) {
        const coin = new Coin(this);
        engine.add(coin);
    }


}
