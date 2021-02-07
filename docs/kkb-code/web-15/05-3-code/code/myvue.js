class Vue extends EventTarget{
    constructor(opts){
        super();
        this.opts = opts;
        this._data = opts.data;
        this.Observer(this._data);
        this.compile();
    }
    Observer(data) {
        let keys = Object.keys(data);
        let _this = this;
        keys.forEach(key => {
            let value = data[key];
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    console.log("get..");
                    return value;
                },
                set(newValue) {
                    console.log("set",newValue);
                    _this.dispatchEvent(new CustomEvent(key,{
                        detail:newValue
                    }));
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
                    // console.log("存在大胡子语法");  
                    let $1 = RegExp.$1;
                    // console.log("("+$1+")" );
                    // let value = this._data[$1];
                    // console.log(value);
                    node.textContent = textContent.replace(reg,this._data[$1]);
                    this.addEventListener($1,(e)=>{
                        // console.log("设置了值",e);
                        let newValue = e.detail;
                        let oldValue = this._data[$1];
                        node.textContent =  node.textContent.replace(oldValue,newValue)
                    })

                }
            }else if(node.nodeType===1){
                console.log("节点");
                if(node.childNodes.length>0){
                    this.compileNodes(node);
                }
            }
        })
    }


}