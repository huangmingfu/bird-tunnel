import { _decorator, Component, Node, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;
import {GameManager} from './GameManager';

@ccclass('BgControl')
export class BgControl extends Component {
    @property(Node)
    public sky1:Node = null
    @property(Node)
    public sky2:Node = null

    public static bgWidth:number = 0//Bg背景节点宽度
    public static bgHeight:number = 0//Bg背景节点高度
    start() {
        this._init()
    }

    update(deltaTime: number) {
        this._bgScroll(deltaTime)
    }
    _init(){
        BgControl.bgWidth = this.node.getComponent(UITransform).width
        BgControl.bgHeight = this.node.getComponent(UITransform).height
        console.log(BgControl.bgWidth);
    }
    _bgScroll(deltaTime: number){
        //图片滚动逻辑：当bg1移动了自身宽度的距离后，bg2其实恰好处在了bg1刚开始的位置，然后立马将bg1放到bg2刚开始的位置
        for(let i = 0; i < this.node.children.length; i++) {
            const {x,y} = this.node.children[i].getPosition()
            const moveX = x - GameManager.gameSpeed * deltaTime
            /**背景的移动*/  
			 this.node.children[i].setPosition( v3(moveX,  y));
              /**达到触发条件，改变背景图片位置*/ 
            if(moveX <= (-BgControl.bgWidth)){
                this.node.children[i].setPosition(v3(this.node.children[i+1<this.node.children.length?i+1:0].position.x+BgControl.bgWidth,y));
            }
		}
        // this.node.children.forEach(itemNode=>{
        //     const {x,y} = itemNode.getPosition()
        //     const moveX = x - GameManager.gameSpeed * deltaTime
        //     itemNode.setPosition(v3(moveX,y))
        //     if(moveX <= (-BgControl.bgWidth)){
        //         itemNode.setPosition(v3(BgControl.bgWidth,y))
        //     }
        // })
    }
}


