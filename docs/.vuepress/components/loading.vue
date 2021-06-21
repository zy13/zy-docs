<template>
  <div class='loading'>
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>

<style lang='less'>
  
  .loading{
    // for demo
    background-color: #000;
    padding: 20px;
    // position: fixed;
    // top: 100px;
    // bottom:0px;
    // left: 0px;
    // right: 100px;
    // z-index: 9999999;
    .spinner{
      width: 150px;
      text-align: center;
      margin: auto;
      position: relative;
      top: 50%;
      div {
        width: 30px;
        height: 30px;
        background-color: #ff7422;
        // background-color: #293E98;

        border-radius: 100%;
        display: inline-block;
        -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
        animation: bouncedelay 1.4s infinite ease-in-out;
        /* Prevent first frame from flickering when animation starts */
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
      }

      .bounce1{
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }

      .bounce2{
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
    }
  }

  @-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 40% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>
