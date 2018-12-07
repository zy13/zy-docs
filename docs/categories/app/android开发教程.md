## 什么是3G
[链接](https://zh.wikipedia.org/wiki/3G)

3G（3rd-Generation）, 第三代移动通信技术，规范名称IMT-2000（International Mobile Telecommunications-2000 ）, 是指支持高速数据传输的蜂窝网络移动电话技术。3G服务能够同时发送声音及信息（邮箱、即时通信等）。3G的代表特征是提供高速数据业务，速率一般在几百kbps以上。

>蜂窝网络（Cellular Network）：又称移动网络（mobile network），是一种移动通信硬件架构，分为模拟蜂窝网络和数字蜂窝网络。由于构成网络覆盖的各通信基地台的信号覆盖呈六边形，从而使整个网络像一个蜂窝而得名。
>kbsp(千兆特每秒)：用于表示数据传输速率（码率）

* 视频教程笔记

标准
WCDMA
CDMA2000
TD-SCDMA

## Android的framework简介
Android的四层架构，包括Linux2.6内核层、核心库层、应用框架层framework、应用层

>framework层提供了许多应用程序开发时需要的API，比如Activity、Service、Notification等

* framework功能
```js
1 用Java语言去编写一些模块封装成框架，供APP层开发使用
2 用Java Native Interface调用core lib层的本地方法，JNI的库在Dalvik虚拟机启动时加载进去。Dalvik会直接去寻找这个JNI方法调用

两种方法的结合达到了Java方法和操作系统的互相通信
```

* framework包含的API

```js
`Activity Manager`：用来管理应用程序生命周期并提供常用的导航回退功能
`Window Manager`：提供一些常用的访问手机屏幕的方法，比如屏幕的透明度、亮度、背景
`Content Providers`：使得应用程序可以访问两一个应用程序的数据（如联系人的数据库），或者共享它们的数据
`View System`：用来构建应用程序界面的API，包括列表、网络、文本框、按钮，甚至可以嵌入web浏览器
`Notification Manager`: 使得应用程序在状态栏中显示自定义的显示信息
`Package Manager`: 提供对系统安装包的访问，包括安装、卸载应用程序，查询permission相关信息，查询Application相关消息等。
`TelePhony Manager`: 主要提供了一系列用于访问与手机通讯录相关的状态和信息的方法，查询电信网络状态信息，SIM卡信息。
`Resource Manager`: 提供非代码资源的访问，如本地字符串，图形，和布局文件
`Location Manager`: 提供设备的地址位置的获取方式，如GPS导航用到的位置服务。
`XMPP Service`: 可扩展通讯和表示协议，前身为Jabber，提供即使通信服务。例如推送功能Google Talk。
```

## 两种虚拟机的比较

### Dalvik VM 和 JVM比较

* 区别
```
1 DalvikVM是针对手机开发的虚拟机，主要目的是避免版权问题而重写的JAVA虚拟机，以及由于安卓系统是基础移动设备的，内存比较小，处理器比较弱，对程序的执行进行进一步优化

2 编译后的文件
JVM：.java=>.class=>.jar
DalvikVM: .java=>.class=>.dex=>.odex

3 基于的框架
JVM：基于栈的架构（栈是连续的内存结构）
DalvikVM: 基于寄存器的架构（寄存器存在于CPU中，访问速度要快）
DalvikVM比普通虚拟机的执行效率要高

头信息：编译的版本，常量，字段、方法、属性，
```

## SDK的下载&简介
[Android中文网](http://www.androiddevtools.cn/)<br>
[Android开发环境的搭建步骤](https://blog.csdn.net/naipeng/article/details/72722682)

SDK(Standar Develop Kits, 标准开发工具集)
ADT(Android Develop kits, 安卓开发工具集)

```js
1 安装JDK(Java Development Kit)
2 安装Eclipse
3 下载并安装AndroinSDK
4 为Eclipse安装ADT插件
```

SDK(Software Development Kit，软件开发工具包)

* 创建Android模拟器
* ddms简介
* platform-tools简介&常见adb指令
* Android项目的目录结构
* Android下apk安装的过程
* 常见adb指令介绍
* 创建模拟器遇到的常见的错误
* 电话拨号器
* 点击时间的4种写法
* 短信发送器
* 相对比距&单位简介
* 线性布局&布局的组合
* 表格布局&绝对布局
* 帧布局
* 测试相关的概念
* Android下的junit测试框架配置
* logcal简介
* 保存文件到手机内存
* Android下手机的访问权限
* 保存文件到SD卡
* 分析setting源码获取SD卡大小
* sharedpreference
* xml文件的序列号
* 采用pull解析xml文件
* 采用断点调试方式观察pull解析流程
* Android下创建一个sqlite数据库
* sql语句实现数据库的增删改查
* 系统api实现数据库的增删改查&sqlite3的使用
* 数据库的事务
* listview的入门
* 采用layoutInflater打气孔穿件一个view对象
* 常用数据适配器ArrayAdapter
* 常用数据适配器simpleAdapter
* 数据适配总结
* 内容提供者简介
* 内容提供者详解
* 短信的备份
* 插入一条记录到系统短信应用
* 内容观察者
* 获取系统的联系人信息
* 保存联系人到系统
* 读取系统联系人的一个小细节
* 网络图片查看器
* anr产生的原理&如何避免
* Android消息机制的入门
* 网络html查看器
* 字符串乱码
* 采用get方式提交数据到服务器
* 采用post方式提交数据
* 提交数据到服务器中乱码的问题
* 采用httpclient提交数据到服务器
* 异步http框架简介和实现原理
* 异步http框架post提交数据到服务器
* 上传文件到服务器
* smartImageview&常见开源代码
* 多线程下载的原理
* 多线程断点下载的原理
* 段线程Java代码移植到Android
* 多线程下载文本界面的更新
* 显式意图激活另一个Activity
* 隐式意图激活另一个Activity
* 隐式意图的配置
* 隐式意图和显式意图的使用
* 在不同Activity之间数据传递
* Activity的生命周期
* Activity的启动模式
* Activity横竖屏切换的生命周期
* 开启新的Activity获取它的返回值
* 请求码和结果码的作用
* 利用广播实现ip拨号
* 短信窃听器
* 自定义广播时间&发送自定义广播&广播接受者的优先级
* 采用服务执行长期后台的操作
* 采用服务窃听电话&服务的生命周期
* Android进程优先级&为什么使用服务
* 服务的生命周期（混合开启）
* 采用aidl绑定远程服务
* 代码注册广播接受者&利用广播调用服务的方法
* 加载大图片到内存
* 获取图片exif信息
* 从gallery获取图片
* 图片画画板
* 图片的旋转
* 图片的平移&镜面
* 图片的合成
* 图片的颜色处理
* 多媒体播放器
* 多媒体播放api
* 人脸识别
* mediaplayer的生命周期
* soundpoo简介
* surfaceView的生命周期
* 播放在线视频
* 视频播放器进度的处理
* 调用系统照相机和录像
* 采用camera拍照
* 常见对话框
* notification入门
* 菜单
* Android下的样式
* Android下的主题
* 代码编写
* HTML创建UI
* 帧动画
* 代码创建常见tween动画
* xml文件定义动画
* 传感器简介
* 9path图形
* 杀死进程
* apk安装
* 应用程序的反编译
* 动态创建
* 用framework创建 一个选项卡
* fragment的向下兼容
* fragment的生命周期
* fragment的生命周期
* fragment的之间的通讯
* 应用程序国际化
