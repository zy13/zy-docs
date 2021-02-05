import GameEvent from './gameEvent.js'

export default class Hero extends GameEvent{
  constructor({name, ico, skills, skins}) {
    super()
    this.name = name
    this.ico = ico
    this.skills = skills
    this.skins = skins
    this.addEvent('initFn', this.init)
  }
  // 不想立刻初始化  要在登录的时候初始化；
  init() {
    console.log('初始化')
  }
}