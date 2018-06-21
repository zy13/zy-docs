# webUploder

### 介绍

<a href="http://fex.baidu.com/webuploader/doc/index.html" target='_blank'>webuploder.js</a>由百度前端团队开发的文件上传插件, 浏览器兼容性好，可运用于m端和pc端设备。

### 插件引用

[文件包最新版本下载]: https://github.com/fex-team/webuploader/releases
[官网demo]: http://fex.baidu.com/webuploader/getting-started.html

* [文件包最新版本下载]

* [官网demo]

* 奇化网demo

```js
<script src="lib/webuploader/webuploader.min.js"></script>

module.exports = {
  fileMax: 6,
  uploader: function () {
    var self = this
    var mimeTypes = 'image/jpeg,image/png,application/pdf,application/msword,'+
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document,'+
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'

    var uploader = WebUploader.create({
      auto: true,
      server: '/Image/webUploader',
      fileNumLimit: self.fileMax,
      fileSingleSizeLimit: 2 * 1024 * 1024,
      duplicate: false,
      pick: '#picker',
      accept: {
        title: 'files',
        extensions: 'jpeg,jpg,png,pdf,docx,doc,xls,xlsx',
        mimeTypes: mimeTypes
      },
      resize: false
    })

    return uploader
  }
}
```


```html
<div class='uploader'>
  <!-- 文件列表 -->
  <ul>
    {{if files}}
      {{each files}}
        <li>
          <span>{{$value.name}}({{$value.size}})</span>
          <span class='btn-delete'>删除</span>
        </li>
      {{/each}}
    {{/if}}
  </ul>
  <div class='btn-add' id='picker'>
    <span>上传新文件</span>
  </div>
</div>
```

### 文件上传常用事件

[官网API]: http://fex.baidu.com/webuploader/doc/index.html#WebUploader_Uploader

* [官网API]

* 文件上传成功事件

```js
uploader.on('uploadSuccess', function(file, res){
  // file为上传成功的文件信息
  // res为调用后台接口返回的数据
})
```

* 文件上传失败事件

```js
uploader.on('error', function(type){
  // type为错误类型
  // type: F_DUPLICATE,文件上传重复
  // type: Q_TYPE_DENIED,word文档内容为空or文件格式错误
  // type: Q_EXCEED_NUM_LIMIT,文件上传数量已达上传
  // type: F_EXCEED_SIZE,文件大小超过上限值
})
```

* 文件删除

```js
// 此事件只能在文件上传成功后调用有效, 即
uploader.on('uploadSuccess', function(file, res){
  <!-- file为删除的文件信息，true是否从消息队列中删除 -->
  uploader.removeFile(file, true)
})

```

* 获取文件状态信息

```js
// 此事件常用于测试文件上传成功与否、文件删除成功与否
// 参数，返回指定状态的文件个数
uploader.getStats([state]) 
```

* 获取上传成功的文件信息
```
// 参数，返回指定状态的文件信息
uploader.getFiles([state]) // 返回数组
```

* 文件上传-奇化网demo

```
询盘单/报价单
入口：奇化网->今日报价->询盘->我要询盘
链接: http://bestsign.cn.keywa.cc/Supply/detail/id/101
```
