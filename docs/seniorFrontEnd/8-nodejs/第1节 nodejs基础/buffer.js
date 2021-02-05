// 实际为二进制数据
// 呈现的是两位一组的16进制编码；

// let buffer = new Buffer(10)
// let buffer = Buffer.alloc(10)
// console.log(buffer)
{/* <Buffer 00 00 00 00 00 00 00 00 00 00> */}

// let res = Buffer.from('大家好')
// console.log(res)
// console.log(res.toString())
{/* <Buffer e5 a4 a7 e5 ae b6 e5 a5 bd> */}

// let res = Buffer.from([0xe5,0xa4,0xa7,0xe5,0xae,0xb6,0xe5,0xa5,0xbd])
// console.log(res)

// let buffer1 = Buffer.from([0xe5,0xa4,0xa7,0xe5])
// let buffer2 = Buffer.from([0xae,0xb6,0xe5,0xa5,0xbd])
// let buffer = Buffer.concat([buffer1,buffer2])
// console.log(buffer.toString())

let { StringDecoder } = require('string_decoder')
let decoder = new StringDecoder()
let res1 = decoder.write(Buffer.from([0xe5,0xa4,0xa7,0xe5]))
let res2 = decoder.write(Buffer.from([0xae,0xb6,0xe5,0xa5,0xbd]))
console.log(res1+res2)


