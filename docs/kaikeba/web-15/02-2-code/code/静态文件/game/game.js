import Player from './player.js';
// 游戏管理类
export default class Game{
    constructor(){
        this.player = null;
    }
    login(username){
        this.player = new Player(username);
    }
}