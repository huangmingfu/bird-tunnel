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

    public static isPlaying:boolean = false//游戏开始标志
    public static gameSpeed:number = 8//游戏速度
    start() {
        this._init()
    }

    update(deltaTime: number) {
        
    }
    _init(){
        this.gameover.active = false
        game.pause()
    }

    //游戏开始
    gameStart(){
        GameManager.isPlaying = true
        this.gamestart.active = false
        this.node.on(Node.EventType.TOUCH_START,this._TOUCH_START,this)
        game.resume()
    }
    //游戏结束
    gameOver(){
        GameManager.isPlaying = false
        this.gameover.active = true
        this.node.off(Node.EventType.TOUCH_START,this._TOUCH_START)
        game.pause()
    }
    //游戏重新开始
    gameRestart(){
        game.resume()
        game.restart()
    }
    //玩家弹跳
    _TOUCH_START(){
        this.player.getComponent(PlayerControl).jump()
    }
    
}