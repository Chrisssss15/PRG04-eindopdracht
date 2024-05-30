import '../css/style.css';
import { Engine, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { GameScene } from './background.js';
import { StartScene } from './startScene.js';
import { EndScene } from './endScene.js';

export class Game extends Engine {
    ui;

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        this.start(ResourceLoader).then(() => this.setupScenes());
    }

    setupScenes() { 
        this.add('startScene', new StartScene());
        this.add('gameScene', new GameScene(this));
        this.add('endScene', new EndScene(this));
        this.goToScene('startScene');
    }

    saveGameData() {
        if (this.ui) {
            const currentScore = this.ui.coins;
            // @ts-ignore
            const storedGameData = JSON.parse(localStorage.getItem('Game highscore')) || { score: 0 };
            if (currentScore > storedGameData.score) {
                localStorage.setItem('Game highscore', JSON.stringify({ score: currentScore }));
                console.log("Gamedata saved:", { score: currentScore });
            } 
            // else {
            //     console.log("Current score is not higher than the stored score. Data not saved.");
            // }
        } else {
            console.log("UI instance is not initialized.");
        }
    }


}

new Game();
