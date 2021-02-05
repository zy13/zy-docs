const fs = require('fs')

/**
 * 1.创建文件
 * flag: 'w' //默认值
 */
function writFile() {
  fs.writeFile('demo/1.txt','写入文件1',err=>{
    if(err){
      return console.log(err)
    }
    console.log('创建成功')
  })
}
// writFile()

/**
 * 修改文件
 * flag: 'a'（追加内容）
 */
function accessFile() {
  fs.writeFile('demo/1.txt',' 追加的内容：666',{flag:'a'},err=>{
    if(err){
      return console.log(err)
    }
    console.log('追加内容成功')
  })
}
accessFile()
