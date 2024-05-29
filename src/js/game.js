// import '../css/style.css';
// import { Engine, Vector, DisplayMode, Label, Font, Keys } from "excalibur";
// import { Resources, ResourceLoader } from './resources.js';
// import { Monkey } from './monkey.js';
// import { Background } from './background.js';
// import { BottomTree } from './bottomTree.js';
// import { TopTree } from './topTree.js';
// import { Coin } from './coin.js';
// import { StartScreen } from './startScene.js';
// import { EndScene } from './endScene.js';

// export class Game extends Engine {
//     coins = 0;
//     score;
//     timerLabel;
//     startTime;
    
//     constructor() {
//         super({
//             width: 1280,
//             height: 720,
//             maxFps: 60,
//             displayMode: DisplayMode.FitScreen
//         });
//         this.coins = 0;
//         this.start(ResourceLoader).then(() => this.startGame());
//     }

//     // Voeg punten toe aan de score (MAG WEG WAARSCHIJNLIJK  )
//     addPoints() {
//         this.coins++;
//         this.score.text = `Score: ${this.coins}`;
//     }

//     startGame() {
//         console.log("start de game!");

//         // Start page game
//         const startPage = new StartScreen();
//         this.add(startPage);

//         if (this.spaceKeyListeners){
//             this.input.keyboard.off('press', this.spaceKeyListeners);
//         }

//         this.spaceKeyListeners = (evt) => {
//             if (evt.key === Keys.Space) {
//                 if(!this.gameStarted){
//                     this.runGame();
//                     this.gameStarted = true;
//                 }
//             }
//         };

//         this.input.keyboard.on('down', this.spaceKeyListeners);
//     }

//     runGame() {
//         // Initialiseer starttijd
//         this.startTime = Date.now();
        
//         // Achtergrond
//         const background = new Background();
//         this.add(background);
        
//         // Aap
//         const monkey = new Monkey();
//         this.add(monkey);
        
//         // Boom beneden
//         const bottomTree = new BottomTree();
//         this.add(bottomTree);
        
//         // Boom boven
//         const topTree = new TopTree();
//         this.add(topTree);
        
//         // Munt
//         this.addCoin();
        
//         // Score
//         this.score = new Label({
//             text: "Score: 0",
//             pos: new Vector(50, 50),
//             font: new Font({ size: 30 })
//         });
//         this.add(this.score);
        
//         // Timer
//         this.timerLabel = new Label({
//             text: "Tijd: 0s",
//             pos: new Vector(50, 100),
//             font: new Font({ size: 30 })
//         });
//         this.add(this.timerLabel);
        
//         // Voeg endScene toe aan de scenes
//         this.add('endScene', new EndScene());
//     }
    

//     // Voeg een munt toe aan het spel
//     addCoin() {
//         const coin = new Coin(this);
//         this.add(coin);
//     }

//     onPostUpdate(engine, delta) {
//         // Update timer
//         const currentTime = Date.now();
//         const elapsedTime = ((currentTime - this.startTime) / 1000).toFixed(1); // Tijd in seconden

//         // Zorg ervoor dat score en timerLabel zijn geïnitialiseerd voordat ze worden gebruikt
//         if (this.timerLabel) {
//             this.timerLabel.text = `Tijd: ${elapsedTime}s`;
//         }

//         if (this.score) {
//             this.score.text = `Score: ${this.coins}`;
//         }

//         // Zorg ervoor dat dit na de timer update gebeurt
//         super.onPostUpdate(engine, delta);
//     }

//     // Methode om de gamegegevens op te slaan in localStorage
//     saveGameData() {
//         const currentTime = Date.now();
//         const elapsedTime = ((currentTime - this.startTime) / 1000).toFixed(1); // Tijd in seconden

//         const gameData = { // Maak een object om gamegegevens op te slaan
//             score: this.coins,
//             time: elapsedTime
//         };

//         localStorage.setItem('Game result history', JSON.stringify(gameData)); // Sla de gamegegevens op in localStorage
//         console.log("Gamedata saved:", gameData); // console.log de opgeslagen gamegegevens
//     }
// }

// new Game();


import '../css/style.css';
import { Engine, DisplayMode, Keys } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Monkey } from './monkey.js';
import { Background } from './background.js';
import { BottomTree } from './bottomTree.js';
import { TopTree } from './topTree.js';
import { Coin } from './coin.js';
import { StartScreen } from './startScene.js';
import { EndScene } from './endScene.js';
import { UI } from './ui.js';

export class Game extends Engine {
    ui;
    
    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");

        // Start page game
        const startPage = new StartScreen();
        this.add(startPage);

        if (this.spaceKeyListeners){
            this.input.keyboard.off('press', this.spaceKeyListeners);
        }

        this.spaceKeyListeners = (evt) => {
            if (evt.key === Keys.Space) {
                if(!this.gameStarted){
                    this.runGame();
                    this.gameStarted = true;
                }
            }
        };

        this.input.keyboard.on('down', this.spaceKeyListeners);
    }

    runGame() {
        // Achtergrond
        const background = new Background();
        this.add(background);
        
        // Aap
        const monkey = new Monkey();
        this.add(monkey);
        
        // Boom beneden
        const bottomTree = new BottomTree();
        this.add(bottomTree);
        
        // Boom boven
        const topTree = new TopTree();
        this.add(topTree);
        
        // Munt
        this.addCoin();

        // UI
        this.ui = new UI();
        this.add(this.ui);
        
        // Voeg endScene toe aan de scenes
        this.add('endScene', new EndScene());
    }

    endGame() {
        console.log("Game over!");

        this.goToScene('endScene');

        if (this.spaceKeyListeners) {
            this.input.keyboard.off('press', this.spaceKeyListeners);
        }

        this.spaceKeyListeners = (evt) => {
            if (evt.key === Keys.Enter) {
                this.startGame();
            }
        };

        this.input.keyboard.on('down', this.spaceKeyListeners);
    }

    addPoints() {
        this.ui.updateScore();
    }

    addCoin() {
        const coin = new Coin(this);
        this.add(coin);
    }

    onPostUpdate(engine, delta) { // Update timer
        super.onPostUpdate(engine, delta); // Zorg ervoor dat dit na de timer update gebeurt
    }

    // saveGameData() {
    //     const elapsedTime = this.ui.timerLabel.text.split(' ')[1].slice(0, -1); // Tijd in seconden
    //     const gameData = { 
    //         score: this.ui.coins,
    //         time: elapsedTime
    //     };

    //     localStorage.setItem('Game result history', JSON.stringify(gameData)); // Sla de gamegegevens op in localStorage
    //     console.log("Gamedata saved:", gameData); // console.log de opgeslagen gamegegevens
    // }


    saveGameData() {
        const elapsedTime = this.ui.timerLabel.text.split(' ')[1].slice(0, -1); // Tijd in seconden
        const currentScore = this.ui.coins;
    
        // Haal de opgeslagen gegevens op uit localStorage
        // @ts-ignore
        const storedGameData = JSON.parse(localStorage.getItem('Game result history'));
    
        // Als er geen opgeslagen gegevens zijn, of als de huidige score hoger is dan de opgeslagen score, sla de huidige gegevens op
        if (!storedGameData || currentScore > storedGameData.score) {
            const gameData = { 
                score: currentScore,
                time: elapsedTime
            };
    
            localStorage.setItem('Game result history', JSON.stringify(gameData)); // Sla de gamegegevens op in localStorage
            console.log("Gamedata saved:", gameData); // console.log de opgeslagen gamegegevens
        } else {
            console.log("Current score is not higher than the stored score. Data not saved.");
        }
    }
    
}

new Game();
