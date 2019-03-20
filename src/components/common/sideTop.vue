<template>
   
        <div class="songTop" >
      <span
        class="iconfont icon-fanhui"
        @click="backing"
      ></span>
      <div class="tilte">
        <em>{{title}}</em>

      </div>
      <!-- <img :src="" alt=""> -->
    </div>
   
</template>
<script>
import * as types from "@/store/types";
export default {
    name:'sidetop',
    data() {
        return {
            
        }
    },
    computed: {
    title(){
       return this.$store.state.songTitle;
    }
  },
  methods: {
       backing() {
      this.$router.go(-1);
    },
  },
}
</script>
<style scoped>
.songTop span {
  font-size: 52px;
}
.songTop {
  display: flex;
  align-items: center;
  flex-direction: row;
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 90px;
  color: #fff;
  background: rgba(51, 51, 51, 0.3);
}
</style>
