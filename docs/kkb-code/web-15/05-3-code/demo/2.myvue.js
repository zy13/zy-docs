class Vue extends EventTarget{
  constructor(opts) {
    super()
    this.options = opts
    this._data = opts.data
    this.Observer(this._data)
    this.compile()
  }
  Observer(data) {
    let _this = this
    Object.keys(data).forEach(key => {
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
          _this.dispatchEvent(new CustomEvent(key, {
            detail: newValue
          }))
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
          this.addEventListener($1, e => {
            let newValue = e.detail;
            let oldValue = this._data[$1]
            node.textContent = node.textContent.replace(oldValue, newValue)
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