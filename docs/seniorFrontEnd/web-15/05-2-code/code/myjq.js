
class Jq{
    constructor(arg,root){
        // 初次实例  非初次
        if(typeof root === "undefined"){
            this.prevObject = [document];
        }else{
            this.prevObject = root;
        }
        if(typeof arg === "string"){
            // this.ele = document.querySelector(arg);
            // 都是类数组
            let eles = document.querySelectorAll(arg);
            console.log(eles);
            this.addEles(eles);
        }else if(typeof arg === "function"){
            // ready
            window.addEventListener("DOMContentLoaded",arg);
        }else{
            // console.log();
            // 原生对象
            // this.ele  = arg;
            // this.addEles(arg);
            // 把一个对象  和 多个对象区分开 分别处理
            if(typeof arg.length === "undefined"){
                this[0] = arg;
                this.length = 1;
            }else{
                this.addEles(arg);
            }
        }
    }
    addEles(eles){
        eles.forEach((ele,key)=>{
            this[key] = ele;
        })
        this.length = eles.length;
    }
    click(fn){
        // this.ele.addEventListener("click",fn);
        for(let i=0;i<this.length;i++){
            this[i].addEventListener("click",fn);
        }
    }
    on(eventName,fn){
        // 获取多个事件
        let reg =/\s+/g;
        let eventArr = eventName.split(reg);
        // console.log(eventArr);
        for(let i=0;i<this.length;i++){
            for(let j=0;j<eventArr.length;j++){
                this[i].addEventListener(eventArr[j],fn);
            }
        }
        return this;
    }
    eq(index){
        // console.log( this[index])
        // return this;
        // return this[index];
        return new Jq(this[index],this);
    }
    get(){
        return this[index];
    }
    end(){
        return this['prevObject'];
    }
    css(...args){
        // arguments
        if(args.length===1){
            // 2种情况 1字符串 2.对象
            if(typeof args[0] === "string"){
                // 字符串 获取样式
              return this.getStyle(this[0],args[0]);
            }else{
                // 对象 设置样式多个样式
                for(let i=0;i<this.length;i++){
                    for(let j in args[0]){
                        this.setStyle(this[i],j,args[0][j]);
                    }
                }
            }
        }else{
            // 多个参数  2个参数 设置样式
            for(let i=0;i<this.length;i++){
                this.setStyle(this[i],args[0],args[1]);
            }
        }
    }
    getStyle(ele,styleName){
        if(styleName in $.cssHooks){
            $.cssHooks[styleName].get(ele);
        }
        return getComputedStyle(ele,null)[styleName];
    }
    setStyle(ele,styleName,styleValue){
        if(typeof styleValue === "number" && !$.cssNumber[styleName]){
            styleValue = styleValue + "px";
        }
        if(styleName in $.cssHooks){
            $.cssHooks[styleName].set(ele,styleValue);
        }

        ele.style[styleName] = styleValue;
    }
    animate(...args){
        let timer = 500;
        if(typeof args[1] === "number"){
            timer =  args[1]
        }else if(typeof args[1] === "string"){
            switch(args[1]){
                case 'fast':
                    timer = 200;
                break;
                case 'nomal':
                    timer = 500;
                    break;
                case 'slow':
                    timer = 1000;
                    break;
            }
        }
        timer = timer/1000 + "s";



        for(let i=0;i<this.length;i++){
            this[i].style.transition = "all " + timer;
            for(let j in args[0]){
                this.setStyle(this[i],j,args[0][j]);
            }
            if(typeof args[args.length-1] === "function"){
                this[i].addEventListener("transitionend",args[args.length-1])
                // setTimeout(args[args.length-1],timer*1000)
            }
            
        }
    }
}


function $(arg){
    return new Jq(arg);
}

$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}
$.cssHooks = {};




// function $(arg){
//     return {
//         ele:document.querySelector(arg),
//         click(fn){
//             this.ele.addEventListener("click",fn);
//         }
//     }
// }