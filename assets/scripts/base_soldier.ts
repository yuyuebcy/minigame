import { _decorator, Animation, Component, Node, Sorting,Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('base_soldier')
export class base_soldier extends Component {
    @property
    speed:number = 0;
    @property
    health: number = 100;
    update(dt: number): void { 
    let a = this.node.getComponent(Animation)
        if(this.health > 0){
            const p = this.node.getPosition();
            p.x += dt*this.speed;
            this.node.setPosition(p);
            a.play();

    }
}

}
