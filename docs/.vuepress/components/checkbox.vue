<template>
  <div class="kw-checkox">
    <input type="checkbox" id="filter">
    <label for="filter"></label>
    <span>我是美颜过的复选框</span>
  </div>
</template>

<style lang='less'>
.kw-checkox {
  input[type="checkbox"] {
    display: none;
    &+label {
      top: 3px;
      width: 14px;
      height: 14px;
      cursor: pointer;
      display: inline-block;
      position: relative;
      margin-left: 14px;
      border: 1px solid #ccc;
      top: 3px;
    }
    &:checked+label {
      border: 1px solid #4496f9;
      background-color: #4496f9;
      &:after {
        content: '';
        width: 7px;
        height: 4px;
        position: absolute;
        top: 3px;
        left: 3px;
        border: 2px solid #fff;
        border-top: none;
        border-right: none;
        
        opacity: 0.4;
        transform: rotate(-45deg);
        opacity: 1;
        border-top: none;
        border-right: none;
      }
    }
  }
  span{
    font-size: 14px;
    padding-left: 10px;
  }
}
</style>