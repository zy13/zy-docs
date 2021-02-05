const fs = require('fs')

/**
 * 创建目录
 */
function mkdir() {
  fs.mkdir('demo/mkdir',err=>{
    if(err){
      return console.log(err)
    }
    console.log('目录创建成功')
  })
}

mkdir()