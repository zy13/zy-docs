1、创建一个数据库kkb
2、在kkb数据库中创建一个表attachments
3、在attachments表中添加至少下四个字段：
        id(int)，filename(varchar)，type(varchar)，size(int)
4、通过koa、koa-router构建一个webserver，端口8888
5、提供一个get方式接口localhost:8888/upload访问上传页面（form表单）
6、提供一个post方式接口localhost:8888/upload处理提交的数据，并返回操作结果（上传失败 or 上传成功）
7、上传后的文件保存在attachments目录下
8、上传的文件信息数据保存到数据库attachments表中