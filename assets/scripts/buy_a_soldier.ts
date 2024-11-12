import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoldierManager')
export class SoldierManager extends Component {
    @property(Prefab)
    soldierPrefab: Prefab = null; // 士兵的预制体

    onLoad() {
        // 绑定按钮事件
        const buttonNode = this.node.getChildByName('make_soldier'); // 按钮的节点名称
        if (buttonNode) {
            const button = buttonNode.getComponent('cc.Button');
            button?.node.on('click', this.createSoldier, this);
        }
    }

    createSoldier() {
        // 实例化士兵预制体
        if (this.soldierPrefab) {
            console.log('生成士兵中...');
            const soldier = instantiate(this.soldierPrefab); // 实例化士兵预制体
            soldier.setPosition(-450,-270); // 设置初始位置，或者根据需要设置其他位置
            this.node.addChild(soldier); // 将士兵添加到当前节点中
        } else {
            console.error('士兵预制体未设置！');
        }
    }
    
}



