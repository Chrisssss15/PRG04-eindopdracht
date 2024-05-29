import { Actor, Sprite, Vector, Label, Font, Scene } from "excalibur";
import { Resources } from "./resources";
import { Game } from "./game";

export class StartScreen extends Actor {
    sprite;

    onInitialize(engine) {
        this.sprite = new Sprite({
            image: Resources.StartScreen,
            // sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawHeight }
        })
        this.anchor = Vector.Zero
        this.graphics.use(this.sprite)

            // Verklein de afbeelding om het effect van uitzoomen te geven
        this.sprite.scale = new Vector(0.73, 0.71); // Vervang 0.5 door de gewenste schaalfactor
    }
}
