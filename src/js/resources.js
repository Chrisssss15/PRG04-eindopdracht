import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Fish } from './fish'
import { Yoshi } from './yoshi'

// voeg hier jouw eigen resources toe
const Resources = {
    Car: new ImageSource('images/car.png'),
    Fish: new ImageSource('images/fish.png'),
    Yoshi: new ImageSource('images/yoshi.png'),
}





const ResourceLoader = new Loader([
    Resources.Car,
    Resources.Fish,
    Resources.Yoshi
])

export { Resources, ResourceLoader }