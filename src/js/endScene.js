import { Actor, Sprite, Vector, Scene, Label, Font, Keys } from "excalibur";
import { Resources } from "./resources";

export class EndScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize(engine) {
        const sprite = new Sprite({
            image: Resources.EndScene,
        });
        const actor = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
        });
        actor.graphics.use(sprite);
        actor.scale = new Vector(0.8, 0.8);
        this.add(actor);

        // @ts-ignore
        const storedGameData = JSON.parse(localStorage.getItem('Game highscore'));
        const highScore = storedGameData ? storedGameData.score : 0;

        const highScoreLabel = new Label({
            text: `High Score: ${highScore}`,
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 150),
            font: new Font({ size: 30, family: 'Arial' })
        });
        this.add(highScoreLabel);
    }

    endGame(engine) {
        console.log("Game over!!!"); 

        if (this.spaceKeyListeners) {
            engine.input.keyboard.off('press', this.spaceKeyListeners);
        }

        this.spaceKeyListeners = (evt) => {
            if (evt.key === Keys.Space) {
                engine.goToScene('startScene');
            }
        };

        engine.input.keyboard.on('down', this.spaceKeyListeners);
    }
}
