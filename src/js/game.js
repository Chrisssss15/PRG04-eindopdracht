import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Yoshi } from './yoshi.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        // const car = new Actor()
        // car.graphics.use(Resources.Car.toSprite())
        // car.pos = new Vector(200, 300)
        // car.vel = new Vector(50,0)
        // this.add(car)

        // const fish = new Actor()
        // fish.graphics.use(Resources.Fish.toSprite())
        // fish.pos = new Vector(1000, 300)
        // fish.vel = new Vector(-50,0)
        // this.add(fish)

        const yoshi = new Yoshi()
        yoshi.graphics.use(Resources.Yoshi.toSprite())
        yoshi.pos = new Vector(1000, 300)
        // yoshi.vel = new Vector(-50,0)
        this.add(yoshi)
    }
}

new Game()
