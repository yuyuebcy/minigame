import { _decorator, Component, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    @property(Button)
    button: Button | null = null;
    @property
    targetScene: string = 'gaming_scene';  // 设置目标场景名称
    onLoad () {
        this.button.node.on(Button.EventType.CLICK, this.callback, this);
    }

    callback (button: Button) {
        // 注意这种方式注册的事件，无法传递 customEventData
        if (this.targetScene) {
            // 加载指定的场景
            director.loadScene(this.targetScene, (error) => {
                if (error) {
                    console.error("场景加载失败：", error);
                } else {
                    console.log("场景切换成功！");
                }
            });
        } else {
            console.warn("未指定目标场景名称！");
        }
    }
    }

