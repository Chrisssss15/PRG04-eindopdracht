// import { Actor, Sprite, Vector, Scene } from "excalibur";
// import { Resources } from "./resources";

// export class EndScene extends Scene {
//     onInitialize(engine) {
//         const sprite = new Sprite({
//             image: Resources.EndScene,
//         });
//         const actor = new Actor({
//             pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
//         });
//         actor.graphics.use(sprite);
//         actor.scale = new Vector(0.8, 0.8); // Vervang 0.5 door de gewenste schaalfactor
//         this.add(actor);
//     }

    
// }

import { Actor, Sprite, Vector, Scene, Label, Font } from "excalibur";
import { Resources } from "./resources";

export class EndScene extends Scene {
    onInitialize(engine) {
        const sprite = new Sprite({
            image: Resources.EndScene,
        });
        const actor = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
        });
        actor.graphics.use(sprite);
        actor.scale = new Vector(0.8, 0.8); // Vervang 0.5 door de gewenste schaalfactor
        this.add(actor);

        // Ontvang de huidige score en high score via de context
        const { currentScore, highScore } = engine.currentScene.args || { currentScore: 0, highScore: 0 };

        // Toon de huidige score
        const currentScoreLabel = new Label({
            text: `Score: ${currentScore}`,
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 100),
            font: new Font({ size: 30, family: 'Arial' })
        });
        this.add(currentScoreLabel);

        // Toon de high score
        const highScoreLabel = new Label({
            text: `High Score: ${highScore}`,
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 150),
            font: new Font({ size: 30, family: 'Arial' })
        });
        this.add(highScoreLabel);
    }
}
