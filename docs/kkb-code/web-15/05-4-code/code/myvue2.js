class Vue{
    constructor(opts){
        this.opts = opts;
        this._data = opts.data;
        this.observer(this._data);
        this.compile();
    }
    observer(data){
        // let dep = new Dep();
        let temp = {};
        // {"myname":{},"message":{}...}
        this._data = new Proxy(data,{
            get(target,key){
                if(typeof temp[key]=== "undefined"){
                    temp[key] = new Dep();
                }
                if(Dep.target){
                    temp[key].addSub(Dep.target);
                }
                return Reflect.get(...arguments);
            },
            set(target,key,newValue){
                // console.log(temp);
                temp[key].notify(newValue);
                return Reflect.set(...arguments);
            }
        })
    }


    // observer(data) {
    //     let keys = Object.keys(data);
    //     // let _this = this;
    //     keys.forEach(key => {
    //         let value = data[key];
    //         let dep = new Dep();
    //         Object.defineProperty(data, key, {
    //             configurable: true,
    //             enumerable: true,
    //             get() {
    //                 console.log("get..");
    //                 if(Dep.target){
    //                     dep.addSub(Dep.target);
    //                 }
    //                 return value;
    //             },
    //             set(newValue) {
    //                 dep.notify(newValue);
    //                 value = newValue
    //             }
    //         })
    //     })
    // }
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
                    // console.log("存在大胡子语法");  
                    let $1 = RegExp.$1;
                    // console.log("("+$1+")" );
                    // let value = this._data[$1];
                    // console.log(value);
                    node.textContent = textContent.replace(reg,this._data[$1]);
                    // this.addEventListener($1,(e)=>{
                    //     // console.log("设置了值",e);
                    //     let newValue = e.detail;
                    //     let oldValue = this._data[$1];
                    //     node.textContent =  node.textContent.replace(oldValue,newValue)
                    // })
                new Watcher(this._data,$1,(newValue)=>{
                    // console.log(newValue);
                    let oldValue = this._data[$1];
                    node.textContent =  node.textContent.replace(oldValue,newValue)
                })
                }
            }else if(node.nodeType===1){
                console.log("节点");
                let attrs = node.attributes;
                // console.log(attrs);
                [...attrs].forEach(attr=>{
                    // console.log(attr);
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    console.log(attrValue);
                    if(attrName==="v-model"){
                        node.value = this._data[attrValue] ;
                        node.addEventListener("input",e=>{
                           let newValue = e.target.value;
                        //    触发了set
                           this._data[attrValue] = newValue
                        })
                    }else if(attrName==="v-html"){
                        node.innerHTML = this._data[attrValue];
                        new Watcher(this._data,attrValue,newValue=>{
                            // console.log("v-html:",newValue)
                            node.innerHTML = newValue;
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