<template>
  <html lang="en" id='html' style="margin: 20px auto;">
    <head id='head'>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>弹性布局</title>
      <link rel="stylesheet" href="index.css">
    </head>
    <body id='body' style="height: 200px;">
      <div class='flex-main'>
        <div class='black'>block1</div>
        <div class='black'>block2</div>
        <p>内容</p>
      </div>
      <div class='flex-footer'>
        底部版权
      </div>
    </body>
  </html>
</template>

<style>
  #html *{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 14px;
    color: #333;
  }
  #html, #body{
    display: flex;
  }
  #html{
    min-height: 100%;
  }
  #body{
    flex: 1;
    flex-flow: column;
    justify-content: space-between;
    background-color: #eee;
  }
  #html .flex-footer{
    text-align: center;
    padding: 10px 0;
  }
</style>

