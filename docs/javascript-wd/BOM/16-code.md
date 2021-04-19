a## 1、window.requestAnimationFrame - 执行网页动画 - 重流和重绘
- [window.requestAnimationFrame](./2-window.html#_3-10-window-requestanimationframe-♥)
- [重流和重绘](./1-intro.html#__3-2-重流和重绘-♥")

**模块平滑向右移动端的例子**
```html
<style>
  #animation{
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<div id="animation"></div>
<script>
  let animation = document.querySelector('#animation')
  animation.style.position = 'absolute'

  let start = null // 记录性能测量开始时间 - 即网页加载的开始时间
  function step(timestamp) { // timestamp（毫秒）：系统传入的高精度时间戳-performance.now()
    if(!start) start = timestamp
    let progress = timestamp - start // 动画执行时长
    animation.style.left = Matn.min(progress/10, 200) + 'px' // 元素不断右移，移动不超过200px
    if(progress < 2000) { // 移动时长不超过2秒
      window.requestAnimationFrame(step) // 继续向右移动元素
    }
  }
  // 推迟step的执行，推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。
  window.requestAnimationFrame(step)
</script>

```