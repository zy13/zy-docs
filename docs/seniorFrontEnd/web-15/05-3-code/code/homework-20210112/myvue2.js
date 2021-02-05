class Vue{
    constructor(opts){
        this.opts = opts;
        this._data = opts.data;
        this.Observer(this._data);
        this.compile();
    }
    Observer(data) {
        let keys = Object.keys(data);
        // let _this = this;
        keys.forEach(key => {
            let value = data[key];
            let dep = new Dep();
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    console.log("get..");
                    if(Dep.target){
                        dep.addSub(Dep.target);
                    }
                    return value;
                },
                set(newValue) {
                    dep.notify(newValue);
                    value = newValue
                }
            })
        })
    }
    compile(){
        let el = document.querySelector(this.opts.el);
        this.compileNodes(el);
    }
    compileNodes(el){
        let childNodes = el.childNodes;
        // console.log(childNodes);
        childNodes.forEach(node=>{
            // 是文本还是标签区分开；
            if(node.nodeType===3){
                console.log("文本");
                let textContent = node.textContent;
                let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
                if(reg.test(textContent)){
                    let $1 = RegExp.$1;
                    node.textContent = textContent.replace(reg,this._data[$1]);
                new Watcher(this._data,$1,(newValue)=>{
                    let oldValue = this._data[$1];
                    node.textContent =  node.textContent.replace(oldValue,newValue)
                })
                }
            }else if(node.nodeType===1){
                console.log("节点");
                let attrs = node.attributes;
                [...attrs].forEach(attr=>{
                    let attrName = attr.name;
                    let key = attr.value;
                    if(attrName==="v-html") {
                        node.innerHTML = this._data[key]
                        new Watcher(this._data,key,(newValue)=>{
                            let oldValue = this._data[key];
                            node.innerHTML =  node.innerHTML.replace(oldValue,newValue)
                        })
                    }
                })
                if(node.childNodes.length>0){
                    this.compileNodes(node);
                }
            }
        })
    }
}



class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify(newValue) {
        this.subs.forEach(sub => {
            sub.update(newValue);
        })
    }
}

// 订阅者；
class Watcher {
    constructor(data,key,cb) {
        this.cb = cb;
        Dep.target  =  this;
        data[key]; //触发get
        Dep.target  = null;

    }
    update(newValue) {
        this.cb(newValue);
    }
}