<template>
  <div id="app">
    <play></play>
    <router-view></router-view>
  
  </div>
</template>

<script>
import play from '@/views/playDetail.vue'
export default {
  name: 'App',
  data() {
    return {
     
    }
  },
  components:{
    'play':play
  }
 
}
</script>

<style>
@import './assets/reset.css'
</style>
