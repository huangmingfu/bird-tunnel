import { _decorator, Component, Node,game, director, find } from 'cc';
const { ccclass, property } = _decorator;
import {PlayerControl} from './PlayerControl';
@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public gamestart:Node = null
    @property(Node)
    public gameover:Node = null
    @property(Node)
    public player:Node = null

    public isPlaying:boolean = false
    public static gameSpeed:number = 500
    start() {
        this._init()
    }

    update(deltaTime: number) {
        
    }
    _init(){
        director.pause()
    }

    //游戏开始
    gameStart(){
        this.isPlaying = true
        this.gamestart.active = false
        this.node.on(Node.EventType.TOUCH_START,this._TOUCH_START,this)
        director.resume()
    }
    //游戏结束
    gameOver(){
        this.node.off(Node.EventType.TOUCH_START,this._TOUCH_START)
        // director.end()
    }
    //玩家弹跳
    _TOUCH_START(){
        this.player.getComponent(PlayerControl).jump()
    }
    
}