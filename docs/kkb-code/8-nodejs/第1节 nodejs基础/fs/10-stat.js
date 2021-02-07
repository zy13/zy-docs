const fs = require('fs')

/**
 * 获取文件/目录的详细信息
 */
function stat(src) {
  fs.stat(src,(err,stat)=>{
    if(err) {
      return console.log(err)
    }
    // console.log(stats)
    // 判断是否是文件
    let isfile = stat.isFile()
    console.log('文件',isfile)
    // 判断是否是目录
    let isdir = stat.isDirectory()
    console.log('目录',isdir)
  })
}
stat('demo/1.txt')
stat('demo/mydir-1')

/**
 * 同步获取文件/目录的详细信息
 *
 * @param {*} src
 */
function statSync(src) {
  let stat = fs.statSync(src)
  console.log(stat)
  // 判断是否是文件
  let isfile = stat.isFile()
  console.log('文件',isfile)
  // 判断是否是目录
  let isdir = stat.isDirectory()
  console.log('目录',isdir)
}
// statSync('demo/1.txt')
// statSync('demo/mydir-1')