export default class KPromise {
    constructor(handle) {
        this['[[PromiseState]]'] = "pending";
        this['[[PromiseResult]]'] = 'undefined';
        // this.resolveFn = undefined;
        // this.rejectFn = undefined;
        this.resolveFnQueue = [];
        this.rejectFnQueue = [];
        handle(this._resolve.bind(this), this._reject.bind(this));
    }
    _resolve(val) {
        // 1.改变状态 2. 改变value
        this["[[PromiseState]]"] = "fulfilled";
        this['[[PromiseResult]]'] = val;
        let run = () => {
            let cb;
            while (cb = this.resolveFnQueue.shift()) {
                cb(val);
            }
        }

        let mo = new MutationObserver(run);
        let box = document.querySelector(".box");
        mo.observe(box, {
            attributes: true
        })
        box.setAttribute("kkb", "kkb");


        // setTimeout(()=>{
        //     // [cb1,cb2....]
        //     // this.resolveFn(val);
        //     let cb;
        //     while(cb = this.resolveFnQueue.shift()){
        //         cb(val);
        //     }
        // })

    }
    _reject(err) {
        this["[[PromiseState]]"] = "rejected";
        this['[[PromiseResult]]'] = err;
        let run = () => {
            let cb;
            while (cb = this.rejectFnQueue.shift()) {
                cb(err);
            }
            // this.rejectFn(err);
        }
        // setTimeout(()=>{
        //     let cb;
        //     while(cb = this.rejectFnQueue.shift()){
        //         cb(val);
        //     }
        //     // this.rejectFn(err);
        // })
        let mo = new MutationObserver(run);
        let box = document.querySelector(".box");
        mo.observe(box, {
            attributes: true
        })
        box.setAttribute("kkb", "kkb");
    }
    then(onResolved, onRejected) {
        // 在then的时候不执行  在_resolve及_reject 执行 回调
        // this.resolveFn = onResolved;
        // this.rejectFn = onRejected;
        // if(this["[[PromiseState]]"]==="fulfilled"){
        // onResolved && onResolved( this['[[PromiseResult]]']);
        // }else if(this["[[PromiseState]]"]==="rejected"){
        //     onRejected && onRejected( this['[[PromiseResult]]']);s
        // }
        return new KPromise((resolve,reject)=>{
        //    let res =  onResolved();
            let onResolvedFn = (val)=>{
                let res = onResolved && onResolved(val);
                // resolve(res);
                // 判断执行结果是不是KPromise
                if(res instanceof KPromise){
                    // kpromise
                    // resolve(res);
                    // res.then(res=>{
                    //     resolve(res);
                    // })
                    // 和上面一样；
                    res.then(resolve);
                }else{
                    resolve(res);     
                }
            }
            let onRejectedFn = (err)=>{
                onRejected && onRejected(err);
                reject(err);
            }
        this.resolveFnQueue.push(onResolvedFn);
        this.rejectFnQueue.push(onRejectedFn);
        })
        // this.resolveFnQueue.push(onResolved);
        // this.rejectFnQueue.push(onRejected);
    }
    static resolve(val){
        return new KPromise(resolve=>{
            resolve(val);
        })
    }
    static reject(err){
        return new KPromise((undefined,reject)=>{
            reject(err);
        })
    }
    static race(list){
        return new KPromise((resolve,reject)=>{
            list.forEach(item=>{
                item.then(res=>{
                    resolve(res);
                },err=>{
                    reject(err)
                })
            })   
        })
    }
    static all(list){
        return new KPromise(resolve=>{
            let resArr = [];
            let num = 0;
            list.forEach(item=>{
                item.then(res=>{
                    num++;
                    resArr.push(res); 
                    if(num===list.length){
                        resolve(resArr);
                    }
                })
            })
        })
    }

    static allSettled(list){
        let resArr = new Array(list.length);
        let num = 0
        return new KPromise(resolve=>{
            list.forEach((item,key)=>{
                let obj = {};
                item.then(res=>{
                    obj['status'] = this['[[PromiseState]]'];
                    obj.value = res;
                    resArr[key] = obj;
                    num++
                    if(num===list.length){
                        resolve(resArr); 
                    }
                },err=>{
                    obj['status'] = this['[[PromiseState]]'];
                    obj.reson = err;
                    resArr[key] = obj;
                    num++
                    if(num===list.length){
                        resolve(resArr); 
                    }
                })
            })
        });
    }
    finally(cb){
        // cb && cb();
        // this.then(res=>{
        //     cb && cb()
        // },err=>{
        //     cb && cb()
        // })
        this.then(cb,cb);
    }
    catch(cb){
        this.then(undefined,err=>{
            cb  &&  cb(err);
        })
    }
}

// 作业： 实现一个finally方法 （注意：一定要等到异步执行完成之后在执行）;