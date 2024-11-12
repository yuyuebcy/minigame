import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Soldier_class')
export class Soldier_class extends Component {
    public health: number;
    public attack: number;
    public speed: number;
}


