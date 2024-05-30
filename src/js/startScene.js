import { Actor, Keys, Scene, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";

export class StartScene extends Scene {
    onInitialize(engine) {
        this.createBackground(engine);
        this.setupInput(engine);
    }

    createBackground(engine) {
        const sprite = new Sprite({ image: Resources.StartScreen });
        const actor = new Actor({ pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2) });
        actor.graphics.use(sprite);
        actor.scale = new Vector(0.75, 0.75);
        this.add(actor);
    }

    setupInput(engine) {
        if (this.spaceKeyListeners) {
            this.input.keyboard.off('press', this.spaceKeyListeners);
        }
        this.spaceKeyListeners = (evt) => {
            if (evt.key === Keys.Space && !this.gameStarted) {
                engine.goToScene('gameScene');
                this.gameStarted = true;
            }
        };
        engine.input.keyboard.on('down', this.spaceKeyListeners);
    }
}
