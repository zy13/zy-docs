import Player from './player.js';
// 游戏管理类
 class Game{
    constructor(){
        this.player = null;
    }
    login(username){
        this.player = new Player(username);
        this.player.heroes.forEach(hero=>{
            hero.trigger("initFn");
        })
    }
}

function getSingle(Fn){
    let instance;
    return function(...args){
        if(!instance){
            instance = new Fn(...args);
        }
        return  instance;
    }
}
export default getSingle(Game);