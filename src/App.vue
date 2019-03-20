<template>
  <div id="app">
    <sidetop></sidetop>
    <play v-if="a"></play>
    <router-view></router-view>
  </div>
</template>
 
<script>
import play from '@/views/playDetail.vue'
import sidetop from "@/components/common/sideTop";
import * as types from '@/store/types' 
export default {
  name: 'App',
  data() {
    return {
    }
  },
  components:{
    'play':play,
    'sidetop':sidetop
  },
  computed: {
    a(){
       return this.$store.state.songUrl;
    }
  },
 
}

</script>

<style>
@import './assets/reset.css';
#page{
  margin-top: 90px;
}
</style>
<style scoped>
.songTop{
  display: none;
}
</style>
