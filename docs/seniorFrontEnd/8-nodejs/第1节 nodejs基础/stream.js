// stream 流
const fs = require('fs')
// let res = fs.readFileSync('demo/1.txt')
// console.log(res)

// let rs = fs.createReadStream('demo/1.txt')
// rs.on('data',chunk=>{
//   console.log(chunk.toString())
// })

// 创建65kb的文件
// let buffer = Buffer.alloc(65*1024)
// fs.writeFile('demo/buffer.txt',buffer,err=>{
//   if(err) {
//     return console.log(err)
//   }
//   console.log('写入成功')
// })

// let rs = fs.createReadStream('demo/buffer.txt')
// let num = 0
// 监听流数据
// rs.on('data',chuck=>{
//   num++
//   // console.log(chuck)
//   console.log(num)
// })
// 流完成
// rs.on('end',()=>{
//   console.log('读取成功')
// })

let rs = fs.createReadStream('demo/buffer.txt')
let ws = fs.createWriteStream('demo/stream2.txt')
rs.pipe(ws)

