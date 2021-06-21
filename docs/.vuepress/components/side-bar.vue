<template>
  <div class="side-bar-container">
    <template v-for="item in arrObj">
      <a :href="`#${item}`">{{item}}</a>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    arrObj: Array
  }
}
</script>

<style>
blockquote{
  background: #2d2d2d;
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  padding: 0.25rem 1.5rem;
  margin: 0.85rem 0;
  border-radius: 6px;
  border-left: 0.1rem solid #b2fd3d;
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}
code{
  color: #7ec699;
  font-size: 14px;
  padding: 0.25rem 0.2rem;
}
li, li>a{
  font-weight: bold;
}
</style>

<style lang="less" scoped>
  .side-bar-container{
    position: fixed;
    max-width: 184px;
    right: 0;
    margin-right: 20px;
    padding: 10px 10px 10px 20px;
    border: 1px solid #eee;
    background: #fff;
    a{
      display: inline-block;
      font-size: 14px;
      padding-bottom: 10px;
      padding-right: 10px;
    }
  }
</style>