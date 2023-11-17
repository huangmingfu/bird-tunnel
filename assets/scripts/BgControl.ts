import { _decorator, Component, Node, UITransform, v3,Layout } from 'cc';
const { ccclass, property } = _decorator;
import { GameManager } from './GameManager';

@ccclass('BgControl')
export class BgControl extends Component {
    public static bgWidth: number = 0//Bg背景节点宽度
    public static bgHeight: number = 0//Bg背景节点高度
    start() {
        this._init()
    }

    update(deltaTime: number) {
        this._bgScroll(deltaTime)
    }
    _init() {
        BgControl.bgWidth = this.node.getComponent(UITransform).width
        BgControl.bgHeight = this.node.getComponent(UITransform).height
    }
    _bgScroll(deltaTime: number) {
        //图片滚动逻辑：当bg1移动了自身宽度的距离后，bg2其实恰好处在了bg1刚开始的位置，然后立马将bg1放到bg2刚开始的位置

        // 也有黑边出现：
        // for(let i = 0; i < this.node.children.length; i++) {
        //     const {x,y} = this.node.children[i].getPosition()
        //     const moveX = x - GameManager.gameSpeed * deltaTime
        //     /**背景的移动*/  
        // 	 this.node.children[i].setPosition( v3(moveX,  y));
        //       /**达到触发条件，改变背景图片位置*/ 
        //     if(moveX <= (-BgControl.bgWidth)){
        //         this.node.children[i].setPosition(v3(this.node.children[i+1<this.node.children.length?i+1:0].position.x+BgControl.bgWidth,y));
        //     }
        // }

        // 这种不会有黑边产生
        // for (let bg of this.node.children) {
        //     bg.x -= this.speed * dt;
        //     if (bg.x < -this.width) {
        //         bg.x += this.width * 2;
        //     }
        // }
        if(!GameManager.isPlaying) return
        this.node.children.forEach(itemNode => {
            const { x, y } = itemNode.getPosition()
            const moveX = x - GameManager.gameSpeed
            itemNode.setPosition(v3(moveX, y))
            if (moveX < (-BgControl.bgWidth)) {
                itemNode.setPosition(v3(moveX + BgControl.bgWidth * 2, y))
            }
        })
    }
}


