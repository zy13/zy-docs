// function $(arg) {
//   return {
//     el: document.querySelector(arg),
//     click: function(fn) {
//       this.el.addEventListener('click', fn)
//     }
//   }
// }

class Jq{
  constructor(arg,root) {
    if(typeof root === 'undefined') {
      this.prevObject = [document]
    } else {
      this.prevObject = root
    }
    if (typeof arg === 'string') {
      let els = document.querySelectorAll(arg)
      this.addElments(els)
    } else if (typeof arg === 'function') {
      window.addEventListener('DOMContentLoaded', arg)
    } else {
      // 原生对象 1个 多个
      if (typeof arg.length === 'undefined') {
        this[0] = arg
        this.length = 1
      } else {
        this.addElments(arg)
      }
    }
  }
  addElments(arg) {
    arg.forEach((el, key) => {
      this[key] = el
      this.length = arg.length
    })
  }
  click(fn) {
    for(let i=0;i<this.length;i++) {
      this[i].addEventListener('click',fn)
    }
  }
  on(eventName, fn) {
    let reg = /\s+/
    let eventArr = eventName.split(reg)
    for(let i=0;i<this.length;i++) {
      for(let j=0;j<eventArr.length;j++) {
        this[i].addEventListener(eventArr[j], fn)
      }
    }
    return this
  }
  eq(index) {
    return new Jq(this[index], this)
  }
  end(){
    return this['prevObject']
  }
  css(...args) {
    console.log(args)
    if(args.length === 1) {
      if (typeof args[0] === 'string') {
        // 字符串
        return this.getStyle(this[0], args[0])
      } else {
        // 对象
        for(let i=0;i<this.length;i++) {
          console.log(i)
          for(let j in args[0]) {
            this.setStyle(this[i], j, args[0][j])
          }
        }
      }
    } else {
      // 多个参数 两个参数
      for(let i=0;i<this.length;i++){
        this.setStyle(this[i], args[0], args[1])
      }

    }
  }
  getStyle(el, styleName) {
    return getComputedStyle(this[0])[styleName]
  }
  setStyle(el, styleName, styleValue){
    if (typeof styleValue === 'number') {
      styleValue = `${styleValue}px`
    }
    el.style[styleName] = styleValue
  }
}

function $(arg) {
  return new Jq(arg)
}

$.cssHooks = {}