<template>
  <div>
    <div class="img-slot" :class="{'zoon-in': isZoom}" @click="handleClick"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: String
  },
  data() {
    return {
      isZoom: false
    }
  },
  methods: {
    handleClick() {
      this.isZoom = !this.isZoom
    }
  }
}
</script>

<style lang="less">
  .img-slot{
    cursor: zoom-in;
    &.zoon-in{
      display: flex;
      position: fixed;
      left: 0; 
      right: 0;
      overflow: auto;
      top: 0;
      bottom: 0;
      width: 100%;
      background: #000;
      z-index: 999;
      img{
        margin: auto;
      }
    }
  }
</style>