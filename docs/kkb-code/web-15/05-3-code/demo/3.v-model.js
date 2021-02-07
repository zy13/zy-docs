class Vue{
  constructor(opts){
    this.options = opts
    this._data = opts.data
    this.Observer(this._data)
    this.compile()
  }
  Observer(data) {
    Object.keys(key => {
      let value = data[key]
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          console.log('get')
          return value
        },
        set(newValue) {
          console.log('set')
          value = newValue
        }
      })
    })
  }
  compile() {
    let el = document.querySelector(this.options.el)
    this.compileNodes(el)
  }
  compileNodes(el) {
    let childNodes = el.childNodes
    childNodes.forEach(node => {
      if(node.nodeType === 3) { // 文本
        let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g
        let textContent = node.textContent
        if(reg.test(textContent)) {
          let $1 = RegExp.$1
          node.textContent = textContent.replace(reg, this._data[$1])

        }
      } else if(node.nodeType === 1){ // html标签
        let attrs = node.attributes;
        [...attrs].forEach(attr => {
          let attrName = attr.name
          let attrValue = attr.value
          if(attrName === 'v-model') {
            node.value = this._data[attrValue]
            node.addEventListener('input', e=>{
              let newValue = e.target.value
              this._data[attrValue] = newValue
            })
          }
        })
        if(node.childNodes.length>0) {
          this.compileNodes(node)
        }
      }
    })
  }
}

// 发布者
class Dep{
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify(newValue) {
    this.subs.forEach(sub => {
      sub.update(newValue)
    })
  }
}

// 订阅者：
class Watcher{
  constructor(data,key,cb){
    this.cb = cb
    Dep.target = this
    data[key];
    Dep.targte = null
  }
  update(newValue) {
    this.cb(newValue)
  }
}