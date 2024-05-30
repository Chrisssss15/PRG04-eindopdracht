import { Actor, CollisionType } from "excalibur";
import { TopTree } from "./topTree";
import { BottomTree } from "./bottomTree";

export class Obstacles extends Actor{
    
    constructor(){
        super({
            name: 'obstacles',
            collisionType: CollisionType.Passive
        });
    }   

    onInitialize(engine){

        let upTree = new TopTree();
        this.addChild(upTree);

        let downTree = new BottomTree();
        this.addChild(downTree);
    }
}