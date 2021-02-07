const fs = require('fs')

/**
 * 读取文件
 * 文本解析：'utf-8'; toString()
 */
function readFile(type) {
  fs.readFile('demo/1.txt',type, (err,data) => {
    if(err) {
      return console.log(err)
    }
    if(type) {
      console.log('utf-8：\n',data)
    } else {
      console.log('Buffer格式：\n',data)
      console.log('toString转换Buffer格式：\n',data.toString())
    }
  })
}

readFile('utf-8')
readFile()

/**
 * 同步读取文件
 * 所有文件操作，没有加Sync都是异步，否则是同步（没有回调函数，只有返还值）
 * @param {*} type
 */
function readFileSync(type) {
  let data = fs.readFileSync('demo/1.txt',type)
  if(type) {
    console.log('同步读取文件：',data)
  } else {
    console.log('同步读取文件：',data.toString())
  }
}
readFileSync()