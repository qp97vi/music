<template>
    <div class="loadingBox">
        <div class="loading"></div>
    </div>
</template>
<script>
export default {
    name:'loading',
}
</script>
<style scoped>
.loadingBox{
 position:absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 140px;
  height: 140px;
  background: #eeeeee;
}
.loading {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(51,51,51,.3);
}
.loading::before {
    content: "";
    width: 70px; 
    height: 70px; 
    background-color: rgb(204, 204, 204);
    position: absolute;
    left: 50%;
    bottom: 50%;
    z-index: 1;
    transform-origin: left bottom;
    animation: rotate 1.5s infinite linear;
  }
.loading::after {
    content: "";
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: #fff;
    z-index: 2;
    border-radius: 50%;
  }
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
