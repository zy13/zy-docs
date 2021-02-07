const fs = require('fs')

/**
 * 读取目录
 */
function readdir() {
  fs.readdir('demo/33',(err,data)=>{
    if(err){
      return console.log(err)
    }
    console.log(data)
  })
}
readdir()

function readdirSync() {
  let data = fs.readdirSync('demo/33')
  console.log(data)
}
readdirSync()