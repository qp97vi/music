<template>
  <ul class="footer">
    <router-link
      to="/mymusic"
      tag="li"
      active-class="as"
    >
      <span class="iconfont icon-musiccloud
"></span>
      发现音乐
    </router-link>
    <router-link
      to="/songList"
      tag="li"
      active-class="as"
    >
      <span class="iconfont icon-yinyue"></span>
      我的音乐
    </router-link>
    <!-- <router-link to="/friend" tag="li" active-class="as">
            <span class="iconfont icon-pengyou"></span>
            朋友
        </router-link> -->
    <router-link
      to="/my"
      tag="li"
      active-class="as"
    >
      <span class="iconfont icon-zhanghao"></span>
      账号
    </router-link>
  </ul>
</template>
<script>

export default ({
  name: 'vfooter',
  data() {
    return {

    }
  },


})
</script>
<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: white;
  border-top: 1px solid #dddddd;
  padding: 0;
}
.isHide {
  display: none;
}
span {
  font-size: 60px;
}

.footer li {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
}
.as {
  color: red;
}
</style>
