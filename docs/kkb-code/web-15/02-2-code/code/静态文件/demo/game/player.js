import Yase from './heros/yase.js'
import Luban from './heros/luban.js'

export default class Player{
  constructor(username) {
    this.username = username
    this.heros = [new Yase(), new Luban()]
  }
}