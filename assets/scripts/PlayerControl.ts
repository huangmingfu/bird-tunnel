import { _decorator, CCInteger, Collider2D, Component, Contact2DType, find, Node, RigidBody2D, v2 } from 'cc';
const { ccclass, property } = _decorator;
import { BgControl } from './BgControl';
import { GameManager } from './GameManager';
@ccclass('PlayerControl')
export class PlayerControl extends Component {
    gameManager: GameManager = null
    start() {
        this._init()
    }
    _init() {
        this.gameManager = find("Canvas/GameManager").getComponent(GameManager)

        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }
    update(deltaTime: number) {
        if (!GameManager.isPlaying) return
        const { y } = this.node.getPosition()
        //飞出背景外
        if (y >= (BgControl.bgHeight / 2)) {
            this.node.destroy()
            this.gameManager.gameOver()
        }
    }
    jump() {
        //小鸟飞行高度差
        this.getComponent(RigidBody2D).linearVelocity = v2(0, 15)
    }
    onBeginContact(self: Collider2D, other: Collider2D) {
        this.gameManager.gameOver()
    }
    
}


