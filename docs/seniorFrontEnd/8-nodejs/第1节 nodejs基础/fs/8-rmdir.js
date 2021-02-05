const fs = require('fs')

/**
 * 删除
 * 1.空目录
 */
function rmdir(src) {
  fs.rmdir(src,err=>{
    if(err){
      return console.log(err)
    }
    console.log('目录删除成功')
  })
}
// rmdir('demo/33/333/tt')

/**
 * 删除
 * 2.先把目录的文件删除==>删除空目录
 * 55
 */
function myRmdirSync(path) {
  let data = fs.readdirSync(path)
  data.forEach(item => {
    let url = path + '/' + item
    let stat = fs.statSync(url)
    if(stat.isDirectory()){
      // 目录：继续查找
      myRmdirSync(url)
    } else {
      // 文件：删除
      fs.unlinkSync(url)
    }
  })
  fs.rmdirSync(path)
}
myRmdirSync('demo/55')