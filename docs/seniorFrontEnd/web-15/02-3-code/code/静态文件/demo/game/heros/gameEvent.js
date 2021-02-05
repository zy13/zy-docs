export default class GameEvent{
  constructor() {
    this.handle = {}
  }
  addEvent(eventName, fn) {
    if(typeof this.handle[eventName] === 'undefined') {
      this.handle[eventName] = []
    }
    this.handle[eventName].push(fn)
  }
  trigger(eventName) {
    this.handle[eventName].forEach(fn => {
      fn()
    })
  }
  removeEvent(eventName, fn) {
    if (typeof this.handle[eventName] === 'undefined') {
      console.log(`没有${eventName}事件`)
    } else {
      let index = this.handle[eventName].indexOf(fn)
      this.handle[eventName].splice(index, 1)
    }
  }
}