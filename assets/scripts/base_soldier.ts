import { _decorator, Animation, Component, Node, PhysicsSystem2D, Vec2, ERaycast2DType, AnimationState,Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('base_soldier')
export class base_soldier extends Component {
    @property
    speed: number = 50;
    @property
    health: number = 100;
    @property
    distance: number = 200;

    Moving: boolean = false;
    isAttack: boolean = false;
    isDead: boolean = false;
    animationState: AnimationState;

    protected onLoad(): void {
        this.Moving = true
        const collider = this.getComponent(Collider2D);
        const animation = this.getComponent(Animation);
        if (animation) {
            this.animationState = animation.getState('walk');
            this.animationState.play();
        } else {
            console.warn("Animation component not found on this node.");
        }
        if (collider) {
            // 监听碰撞开始事件
            collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
            // 监听碰撞结束事件
            collider.on(Contact2DType.END_CONTACT, this.onCollisionExit, this);
        }
    }

        // 定义 onCollisionEnter 方法
        onCollisionEnter(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
            console.log("发生碰撞！");
            this.Moving = false; // 根据需要设置状态
        }
    
        // 定义 onCollisionExit 方法
        onCollisionExit(selfCollider: Collider2D, otherCollider: Collider2D) {
            console.log("碰撞结束");
            this.Moving = true;
        }

    update(dt: number): void { 
        this.Detection()
        if (this.Moving) {
            this.move(dt);
        }
        if (this.isAttack) {
            this.attack();
        }
        this.checkStatus();
    }

    // 移动方法，控制位置更新
    move(dt: number): void {
        const x = this.node.getPosition();
        x.x += dt * this.speed;
        this.node.setPosition(x);
        this.playAnimation()
    }

    // 播放动画
    playAnimation(): void {
        if(this.Moving){
            if (!this.animationState.isPlaying) {
                this.animationState.play()}
        }
        else{
            if(!this.animationState.isPaused)
            {this.animationState.stop()}
        }
    }

    // 检测方法
    Detection(): void {
        let nodePosition3D = this.node.getWorldPosition();
        let startPosition = new Vec2(nodePosition3D.x, nodePosition3D.y);
        let endPosition = new Vec2(nodePosition3D.x+this.distance,nodePosition3D.y)
        let results = PhysicsSystem2D.instance.raycast(startPosition, endPosition, ERaycast2DType.Closest);

        if (results.length > 0) {
            let collider = results[0].collider;
            console.log("检测到敌人");
            this.isAttack = true;
        }
    }

    // 攻击行为
    attack(): void {
        // 攻击逻辑
        console.log("执行攻击动作");
        this.isAttack = false; // 执行一次攻击后恢复状态
    }

    // 状态检查方法
    checkStatus(): void {
        if (this.health <= 0) {
            this.isDead = true;
            console.log("士兵已阵亡");
        }
    }
}
