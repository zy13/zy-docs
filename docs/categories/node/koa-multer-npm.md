### 文件上传到node端

[参考文档]:https://www.npmjs.com/package/koa-multer
如果需要将客户端的文件保存在node中间件中，可以使用koa-multer包来实现，[参考文档]

### node端代码

```js
const multer = require('koa-multer')
const { uploadPath } = require('../config/common.js') // 文件存放路径

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${uploadPath}`)
  },
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split(`.`)
    cb(null, `${Date.now()}.${fileFormat[fileFormat.length - 1]}`)
  }
})

const upload = multer({
  storage: storage
})

module.exports = upload
```