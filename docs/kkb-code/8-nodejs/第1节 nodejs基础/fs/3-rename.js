const fs = require('fs')

/**
 * 修改文件/目录名称
 *
 */
function rename(src,myname) {
  fs.rename(src,myname,err=>{
    if(err) {
      return console.log(err)
    }
    console.log('修改成功！')
  })
}
// rename('demo/2.txt','demo/2-2.txt')
// rename('demo/mydir','demo/mydir-1')

/**
 * 同步修改文件名
 *
 */
function renameSync() {
  fs.renameSync('demo/2-2.txt', 'demo/2-2.html')
}
// renameSync()



