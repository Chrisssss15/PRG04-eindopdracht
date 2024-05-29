import { Actor, Sprite, Vector } from "excalibur";
import { Resources } from "./resources";

export class Background extends Actor {
    sprite;

    onInitialize(engine) {
        this.sprite = new Sprite({
            image: Resources.Background
        });

        this.anchor = Vector.Zero;
        this.graphics.use(this.sprite);

        // Verklein de afbeelding om het effect van uitzoomen te geven
        this.sprite.scale = new Vector(0.75, 0.75); // Vervang 0.5 door de gewenste schaalfactor
    }

    onPostUpdate(engine, delta) {
        const backgroundWidth = this.sprite.drawWidth * this.sprite.scale.x;
        // Als de afbeelding buiten het zicht gaat, reset dan de x-positie
        if (this.sprite.sourceView.x >= backgroundWidth) {
            this.sprite.sourceView.x = -this.sprite.drawWidth;
        }
        this.sprite.sourceView.x += 1 * delta;
    }
}
