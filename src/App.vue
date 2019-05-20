<template>
  <div id="app">
    <player v-if="songlists"></player>
    <router-view></router-view>
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
</style>
<style scoped>

.songTop {
  display: none;
}
</style>