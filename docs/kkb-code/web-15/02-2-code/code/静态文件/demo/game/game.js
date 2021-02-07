// 游戏管理
import Player from './player.js'

export default class Game{
  constructor(){
    this.player = null
  }
  login(username){
    this.player = new Player(username)
  }
}