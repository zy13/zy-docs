 class GameEvent {
    constructor() {
        this.handles = {};
    }
    addEvent(eventName, fn) {
        if (typeof this.handles[eventName] === "undefined") {
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(fn);
    }
    // 触发
    trigger(eventName) {
        this.handles[eventName].forEach(fn => {
            fn();
        })
    }
    // 移除事件；
    removeEvent(eventName, fn) {
        if (!(eventName in this.handles)) {
            return;
        }
        for (let i = 0; i < this.handles[eventName].length; i++) {
            if (this.handles[eventName][i] === fn) {
                this.handles[eventName].splice(i, 1);
                break;
            }
        }
    }
}

// 作业 ：实现一个 removeEvent方法 (移除指定的fn)
// removeEvent(eventName,fn1)
function fn1(){
    console.log("fn1..");
}
function fn2(){
    console.log("fn2..");
}


let gameevent  = new GameEvent();
gameevent.addEvent("myevent",fn1);
gameevent.addEvent("myevent",fn2);
gameevent.removeEvent("myevent",fn2);
gameevent.trigger("myevent");  // 结果 fn2...