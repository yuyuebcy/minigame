import { _decorator, Animation, Component, Node, Sorting,PhysicsSystem2D, Vec2, ERaycast2DType, DirectionalLightComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('base_soldier')
export class base_soldier extends Component {
    @property
    speed:number = 50;
    @property
    health: number = 100;
    @property
    distance:number = 500
    update(dt: number): void { 
        const a = this.node.getComponent(Animation)
        const n = a.getState('walk');
        if(this.health > 0){
            const p = this.node.getPosition();
            p.x += dt*this.speed;
            this.attack();
            this.node.setPosition(p);
            if(!n.isPlaying)
            {
                n.play();
            }
       }
    }

    attack():void{
        // 获取当前节点的世界位置（Vec3）
        let nodePosition3D = this.node.getWorldPosition();

        let startPosition = new Vec2(nodePosition3D.x, nodePosition3D.y);

        let direction = new Vec2(1, 0).normalize();

        let endPosition = new Vec2();
        Vec2.multiplyScalar(endPosition, direction, this.distance);
        Vec2.add(endPosition, startPosition, endPosition);

        let results = PhysicsSystem2D.instance.raycast(startPosition, endPosition, ERaycast2DType.Closest);

        if (results.length > 0) {
            let collider = results[0].collider
            let node = collider.node
            console.log("成功检测")
        }
        else
        {
            console.log("无目标")
        }
    }
}