// 游戏管理
import Player from './player.js'

class Game{
  constructor(){
    this.player = null
  }
  login(username){
    this.player = new Player(username)
    console.log(this.player)
    this.player.heros.forEach(hero => {
      hero.trigger('initFn')
    })
  }
}

function getSingle(Fn) {
  let instance;
  return function(...args) {
    if(!instance) {
      instance = new Fn(...args)
    }
    return instance
  }
}

export default getSingle(Game)

