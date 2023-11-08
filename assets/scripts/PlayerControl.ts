import { _decorator, CCInteger, Component, find, Node, v3 } from 'cc';
const { ccclass, property } = _decorator;
import { BgControl } from './BgControl';
import { GameManager } from './GameManager';
@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property({ type: CCInteger })
    bounceHeight: number = 200

    gameManager:GameManager = null
    start() {
        this.gameManager = find("Canvas/GameManager").getComponent(GameManager)
    }

    update(deltaTime: number) {
        if(!this.gameManager.isPlaying) return
        const { y } = this.node.getPosition()
        //掉出背景外
        if (y <= (-BgControl.bgHeight / 2)) {
            this.node.destroy()
            this.gameManager.gameOver()
        }
        //飞出背景外
        if (y >= (BgControl.bgHeight / 2)) {
            this.node.destroy()
            this.gameManager.gameOver()
        }
    }
    jump() {
        const { x, y } = this.node.getPosition()
        console.log('PlayerControl',y);
        this.node.setPosition(v3(x, y + this.bounceHeight))
        console.log('end',this.node.position.y);
    }
}


