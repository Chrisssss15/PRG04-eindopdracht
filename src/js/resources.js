import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'
import { Monkey } from './monkey'
import { Bullet } from './bullet'
import { EndScene } from './endScene'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat}), 
    StartScreen: new ImageSource ('images/startScreen.png'),
    EndScene: new ImageSource ('images/endScene.png'),
    Coin: new ImageSource('images/coin.png'),
    Monkey: new ImageSource('images/FlyingMonkey.png'),
    BottomTree: new ImageSource('images/bottomTree.png'),
    TopTree: new ImageSource('images/topTree.png'),
    Bullet: new ImageSource('images/bullet.png'),


}





const ResourceLoader = new Loader([
    Resources.Monkey,
    Resources.Background,
    Resources.BottomTree,
    Resources.TopTree,
    Resources.Coin,
    Resources.Bullet,
    Resources.StartScreen,
    Resources.EndScene

])

export { Resources, ResourceLoader }