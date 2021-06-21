### 在node端生成图片验证码

[参考文档]: https://www.npmjs.com/package/svg-captcha
使用`svg-captcha`可以实现在node端生成图片验证码然后返回到客户端，整个过程不需要经过服务端就可以实现

### node端代码

```js
exports.imgCodeConfig = {
  inverse: false,
  fontSize: 36,
  size: 5,
  ignoreChars: '0o1i',
  noise: 0,
  width: 80,
  height: 30,
  bg: '#000',
  color: '#4496f9'
}
```

```js
const { imgCodeConfig } = require('../config/common.js')
const svgCaptcha = require('svg-captcha')

module.exports = async (ctx, next) => {
  const captcha = svgCaptcha.create(imgCodeConfig)
  ctx.session.imgCodeId = captcha.text.toLowerCase()

  ctx.type = 'image/svg+xml'
  ctx.body = String(captcha.data)
}
```