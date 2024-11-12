import { _decorator, Component, Node, Sorting } from 'cc';
import { Soldier_class } from './Soldier_class';
const { ccclass, property } = _decorator;

@ccclass('base_soldier')
export class base_soldier extends Soldier_class {
    health = 100;
    attack = 10;
    speed = 5;
}


