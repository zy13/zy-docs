### 通过node中间件的文件上传

[参考文档]:https://www.npmjs.com/package/form-data
form-data可用于读取"multipart/form-data"格式的数据流，可以在node端实现form表单的数据读取、提交，从而实现向服务器上传文件，[参考文档]

### node端代码

```js
const fs = require('fs')
const { baseUrl } = require('../config/common.js')
const { fileLimit, maxFileSize } = require('../config/common.js')
const FormData = require('form-data')

class UploadController {
  static async common (ctx, next) {
    const {path, mimetype, size} = ctx.req.file
    const pathUrl = ctx.request.path.replace('/api', '')
    const accessToken = ctx.session.accessToken || ''
    const host = baseUrl.split('//')[1]
    const protocol = baseUrl.split('//')[0]

    if (fileLimit.indexOf(mimetype) === -1) {
      ctx.body = {
        code: 400,
        msg: '文件类型错误！'
      }
    } else if (size > maxFileSize) {
      ctx.body = {
        code: 400,
        msg: '文件大小超过限制!'
      }
    } else {
      const form = new FormData({
        maxDataSize: maxFileSize
      })

      form.append('token', accessToken)
      form.append('pic', fs.createReadStream(path.replace('\\','/')))

      await new Promise(function(resolve, reject){
        form.submit({
          host: host,
          path: pathUrl,
          protocol: protocol,
          headers: form.getHeaders({
            'Cookie': ctx.request.header.cookie
          })
        }, function (err, res) {
          fs.unlink(path)
          res.setEncoding('utf8')
          res.on('data', function(chunk) {
            ctx.body = JSON.parse(chunk)
            resolve(ctx.body)
          })
          res.on('end', function(){
            console.log('res end')
          })
        })
      })
    }
  }
}

module.exports = UploadController
```