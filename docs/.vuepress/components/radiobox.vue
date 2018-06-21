<template>
<div class='dc-input-radio'>
  <input type="radio" name="radio" :id='"radio"+labelTxt'>
  <label :for='"radio"+labelTxt'></label>
  <span>{{labelTxt}}</span>
</div>
</template>

<script>
  export default{
    props: {
      labelTxt: {
        type: String,
        default: '我是美颜过的单选框1号'
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="less">
  .dc-input-radio{
    input[type='radio'] {
      display: none;
      &+label{
        width: 18px;
        height: 18px;
        border: 1px solid #ddd;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        display:inline-block;
        position: relative;
        top: 5px;
        -moz-box-shadow:1px 1px 1px #fff inset; /* For Firefox3.6+ */
        -webkit-box-shadow:1px 1px 1px #fff inset; /* For Chrome5+, Safari5+ */
        box-shadow:1px 1px 1px #fff inset; /* For Latest Opera */
      }
      &:checked+label:after{
        content: '';
        width: 12px;
        height: 12px;
        position: absolute;
        top: 3px;
        left: 3px;
        background: #293D97;
        border-radius: 50%;
      }
    }
    >span{
      padding-left: 10px;
      font-size: 14px;
    }
  }
</style>