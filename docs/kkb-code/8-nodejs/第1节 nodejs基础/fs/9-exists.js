const fs = require('fs')

/**
 * 判断文件/目录是否存在
 */
function exists(src) {
  fs.exists(src,exists=>{
    console.log(exists)
  })
}

exists('demo/mkdir')
exists('demo/mydir-1')