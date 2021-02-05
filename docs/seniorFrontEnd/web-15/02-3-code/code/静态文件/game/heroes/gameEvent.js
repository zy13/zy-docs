export default class GameEvent{
    constructor(){
        this.handles = {};
    }
     addEvent(eventName,fn){
        if(typeof this.handles[eventName] === "undefined"){
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(fn);
    }
    // 触发
     trigger(eventName){
        this.handles[eventName].forEach(fn=>{
            fn();
        })
    }
    // 移除事件；
}

// 作业 ：实现一个 removeEvent方法 (移除指定的fn)
// removeEvent(eventName,fn1)
/* let gameevent  = new GameEvent();
gameevent.addEvent("myevent",fn1);
gameevent.addEvent("myevent",fn2);
gameevent.removeEvent("myevent",fn1);
gameevent.trigger("myevent");  // 结果 fn2...
*/