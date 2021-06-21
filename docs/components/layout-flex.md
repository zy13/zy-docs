### 适用于移动端的弹性布局

[参考链接1]: https://www.cnblogs.com/xuyuntao/articles/6391728.html
[参考链接2]: https://www.cnblogs.com/Renyi-Fan/p/8116310.html
[弹性布局的demo网站]: www.talebase.com
很多时候，前端在做移动端的时候都会遇到要底部内容置于页面底部的情况，如果使用fixed/absolute的方式会有很多兼容性问题。在这里，使用flex弹性布局
不仅对移动端兼容性好，还可以满足各种移动端的布局而减少兼容性等问题, 更多布局查看[参考链接1]、[参考链接2]。采用[弹性布局的demo网站]

### demo

<layout-flex></layout-flex>

### html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>弹性布局</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class='flex-main'>
    <div class='black'>block1</div>
    <div class='black'>block2</div>
    <p>pppppp</p>
  </div>
  <div class='flex-footer'>
    底部版权
  </div>
</body>
</html>
```

### css

```css
html, body{
  display: flex;
}
html{
  min-height: 100%;
}
body{
  flex: 1;
  flex-flow: column;
  justify-content: space-between;
  background-color: #eee;
}
```


### 左右布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    html,body{
      height: 100%;
    }
    .footer{
      background-color: blue;
      color: #fff;
      line-height: 50px;
      text-align: center;
    }
    .container{
      display: flex;
      flex-direction: column;
      height: inherit;
    }
    .main{
      flex: auto;
    }
    .main-wrap{
      display: flex;
    }
    .main-bar{
      flex: auto;
      padding: 0 10px;
    }
    .top-container{
      min-height: 100px;
      background-color: azure;
    }
    .middle-container{
      min-height: 50px;
      background-color:beige;
    }
    .bottom-container{
      min-height: 100px;
      background-color:burlywood;
    }
  </style>
</head>
<body>
  <div class="container">
    <!--上下布局-->
    <div class="main">
      <div class="main-wrap">
        <!--左右布局-->
        <div class="sibe-bar">
          <ul>
            <li><a href="">首页</a></li>
            <li><a href="">用户</a></li>
            <li><a href="">图册</a></li>
            <li><a href="">设置</a></li>
          </ul>
        </div>
        <div class="main-bar">
          <div class="top-container">top</div>
          <div class="middle-container">middle</div>
          <div class="bottom-container">bottom</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>版权所有</div>
    </div>
  </div>
</body>
</html>

```


