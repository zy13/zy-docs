import e from './b.js';
console.log("a.js");
let a = 10;
let b = 20;
let c = 30;
// export default a;  //只能导出一个
export {a as default};
// export default b;
export {b};  // 可以多个
export {c,e};

