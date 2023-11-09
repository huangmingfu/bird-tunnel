import { _decorator, Component, find, Layout, Node, v3 } from 'cc';
const { ccclass, property } = _decorator;
import { GameManager } from './GameManager';
import MathUtil from './utils/MathUtil';
@ccclass('PipeControl')
export class PipeControl extends Component {
    start() {
    }
    update(deltaTime: number) {
        this._pipeScroll(deltaTime)
    }
    _pipeScroll(deltaTime: number){
        if(!GameManager.isPlaying) return
        this.node.children.forEach(itemNode => {
            const { x, y } = itemNode.getPosition()
            const moveX = x - (GameManager.gameSpeed * deltaTime)
            itemNode.setPosition(v3(moveX, y))
            if (moveX <= (-1200)) {
                //回到原位
                itemNode.setPosition(v3(200, y));
                //设置管道随机间隙
                itemNode.getComponent(Layout).spacingY = MathUtil.getRandomInt(80,200)
            }
        })
    }
}


