import { Actor, Color, Font, Label, Vector } from "excalibur";

export class UI extends Actor {
    scoreLabel;
    timerLabel;
    startTime;
    coins = 0;

    constructor() {
        super();
        this.startTime = Date.now();
    }

    onInitialize(engine) {
        this.scoreLabel = new Label({
            text: "Score: 0",
            pos: new Vector(50, 50),
            font: new Font({ size: 30, family: 'Arial' })
        });

        this.timerLabel = new Label({
            text: "Tijd: 0s",
            pos: new Vector(50, 100),
            font: new Font({ size: 30, family: 'Arial' })
        });

        engine.add(this.scoreLabel);
        engine.add(this.timerLabel);
    }

    updateScore() {
        this.coins++;
        this.scoreLabel.text = `Score: ${this.coins}`;
    }

    updateTime() {
        const currentTime = Date.now();
        const elapsedTime = ((currentTime - this.startTime) / 1000).toFixed(1);
        this.timerLabel.text = `Tijd: ${elapsedTime}s`;
    }

    onPostUpdate(engine, delta) {
        this.updateTime();
    }
}
