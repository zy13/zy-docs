const fs = require('fs')

/**
 * 复制
 */
function copyFile() {
  fs.copyFile('demo/3.txt','demo/33/copy-3.txt', err => {
    if(err){
      return console.log(err)
    }
    console.log('复制成功')
  })
}
// copyFile()

/**
 * 同步复制
 */
function copyFileSync() {
  fs.copyFileSync('demo/3.txt','demo/33/copy-33.txt')
}
// copyFileSync()

/**
 * 复制：先读取 再写入
 */
function myCopyFile(src,filename) {
  let data = fs.readFileSync(src,'utf-8')
  fs.writeFile(filename, data, err => {
    if(err){
      return console.log(err)
    }
    console.log('复制成功！')
  })
}
myCopyFile('demo/1.txt', 'demo/my-copy-1.txt')
