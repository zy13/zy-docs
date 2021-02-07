const fs = require('fs')

/**
 * 删除文件
 *
 */
function unlink() {
  fs.unlink('demo/33/33.txt',err=>{
    if(err){
      return console.log(err)
    }
    console.log('删除成功')
  })
}
// unlink()

function unlinkSync() {
  fs.unlinkSync('demo/33/333.txt')
}
unlinkSync()

