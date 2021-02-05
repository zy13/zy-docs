// 文件操作模块-内置模块

const fs = require('fs')

// 增删改查（任何后缀类型的文件）
// 1.文件操作 2.目录操作

// 1.文件操作
// 增加文件：fs.writeFile('文件名','文件内容',cb)
// fs.writeFile('1.txt', '我是文件1',function(err) {
//   if(err) {
//     return console.log(err)
//   }
//   console.log('新建成功')
// })

// 修改文件：fs.writeFile('文件名','文件内容',{flag:'配置'}, cb)
// 配置：a追加写入；w写入；r读取
// fs.writeFile('1.txt', '12222-99',{flag:'a'},function(err) {
//   if(err) {
//     return console.log(err)
//   }
//   console.log('新建成功')
// })

// 文件读取
// fs.readFile('1.txt', 'utf-8', function(err,data) {
//   if(err) {
//     return console.log(err)
//   }
//   console.log(1,data)
// })
// fs.readFile('1.txt', function(err,data) {
//   if(err) {
//     return console.log(err)
//   }
//   console.log(2,data)
// })
// fs.readFile('1.txt', function(err,data) {
//   if(err) {
//     return console.log(err)
//   }
//   console.log(3,data.toString())
// })

// 所有文件操作 没有加Sync都是异步 否则是同步(没有回调，只有返还值)
// let data = fs.readFileSync('1.txt')
// console.log(data.toString())

// 修改文件名称
// fs.rename('1.txt','2.txt',err=>{
//   if(err) {
//     return console.log(err)
//   }
//   console.log('文件名修改成功！')
// })

// 删除
// fs.unlink('2.txt', function(err) {
//   if(err) {
//     return console.log(11, err)
//   }
//   console.log('删除成功')
// })

// 复制：先读取 再写入
// fs.copyFile('http.js','myhttp.js',err=>{
//   if(err) {
//     return console.log(11, err)
//   }
//   console.log('删除成功')
// })

// 复制
// function myCopy(src, dest) {
//   fs.writeFileSync(dest, fs.readFileSync(src))
// }
// myCopy('../../01.md', 'mymd.md')

// 2. 目录操作

// 创建目录
// fs.mkdir('11',err=>{
//   if(err) {
//     return console.log(11, err)
//   }
//   console.log('创建成功')
// })

// 修改目录名称
// fs.rename('11','22', err=>{
//   if(err) {
//     return console.log(11, err)
//   }
//   console.log('修改成功')
// })

// 读取目录
// fs.readdir('22',(err,data)=>{
//   if(err) {
//     return console.log(11, err)
//   }
//   console.log(data)
// })

// 删除目录（空文件夹/目录）
// fs.rmdir('22/33',err=>{
//   if(err) {
//     return console.log(11, err)
//   }
//   console.log('删除成功')
// })

// 判断文件或者目录是否存在
// fs.exists('22',exists=>{
//   console.log(exists)
// })

// 获取文件或者目录的详细信息
// fs.stat('22',(err,stat) => {
//   if(err) {
//     return console.log(11, err)
//   }
//   console.log(stat)
//   // 判断是否是文件
//   // let res1 = stat.isFile()
//   // console.log(res1)
//   // 判断是否是目录
//   let res2 = stat.isDirectory()
//   console.log(res2)
// })
// fs.stat('22/2.html',(err,stat) => {
//   if(err) {
//     return console.log(11, err)
//   }
//   console.log(stat)
//   // 判断是否是文件
//   // let res1 = stat.isFile()
//   // console.log(res1)
//   // 判断是否是目录
//   let res2 = stat.isDirectory()
//   console.log(res2)
// })

// 删除非空目录/文件夹
// 先把目录的文件删除==》删除空目录
// 22
// function removeDir(path){
//   let data = fs.readdirSync(path) // ['33','1.txt','2.html']
//   data.forEach(item => {
//     //是文件还是目录：文件？直接删除：目录继续循环
//     let url = path+'/'+item
//     let stat = fs.statSync(url)
//     if(stat.isDirectory()) {
//       //目录：继续查找
//       removeDir(url)
//     } else {
//       //文件：删除
//       fs.unlinkSync(url)
//     }
//   })
//   fs.rmdirSync(path)
// }

// removeDir('22')
