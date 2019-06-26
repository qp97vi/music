<template>
  <div id="app">
    <player v-if="songlists">
    </player>
   <!-- <transition name="fade"> -->
    <router-view></router-view>
  <!-- </transition> -->
  </div>
</template>

<script>
import play from '@/views/playDetail.vue';
import * as types from '@/store/types';
import player from "@/components/common/player/player";
export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    'play': play,
    player
  },
  computed: {
    songlists() {
      return this.$store.state.songUrl;
    }
  },
}

</script>

<style>
@import "./assets/reset.css";
@import "./assets/mint-ui";
#app img[lazy=loading] {
    /*your style here*/
    display:block;
    width:64px;
    height: 64px;
    margin:auto;
    position: relative;
  top:50%;
  transform:translateY(-50%);
  }
#app img[lazy=error] {
      display:block;
    width:64px;
    height: 64px;
    margin:auto;
  }
</style>
<style scoped>
.songTop {
  display: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>