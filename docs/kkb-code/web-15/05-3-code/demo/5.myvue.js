class Vue {
  constructor(opts) {
    this.options = opts
    this._data = opts.data
    this.observer(this._data)
    this.compile()
  }
  observer(data) {
    let _this = this
    Object.keys(data).forEach(key => {
      let value = data[key]
      let dep = new Dep()
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          console.log('get', value)
          if(Dep.target) {
            dep.addSub(Dep.target)
          }
          return value
        },
        set(newValue) {
          console.log('set', newValue)
          dep.notify(newValue)
          value = newValue
        }
      })
    })
  }
  compile() {
    let el = document.querySelector(this.options.el)
    // nodeType html文本text-3 html标签-1
    this.compileNodes(el)
  }
  compileNodes(el) {
    let childNodes = el.childNodes
    childNodes.forEach(node => {      
      if(node.nodeType === 3) { // 文本
        let textContent = node.textContent
        let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
        if (reg.test(textContent)) {
          let $1 = RegExp.$1
          node.textContent = textContent.replace(reg, this._data[$1])
          new Watcher(this._data,$1,(newValue)=>{
            let oldValue = this._data[$1];
            node.textContent =  node.textContent.replace(oldValue,newValue)
          })
        }
      } else if (node.nodeType === 1) { // html标签为
        let attrs = node.attributes;
        [...attrs].forEach(attr => {
          let {name, value} = attr
          if(name === 'v-model') {
            node.addEventListener('input', e => {
              this._data[value] = e.target.value
            })
          } else if(name === 'v-html') {
            node.innerHTML = this._data[value]
          }
        })
        if (node.childNodes.length > 0) {
          this.compileNodes(node)
        }
      }
    })
  }
}

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

class Watcher{
  constructor(data,key,cb) {
    this.cb = cb;
    Dep.target = this
    data[key]; // 出发get
    Dep.target = null
  }
  update(newValue) {
    this.cb(newValue)
  }
}