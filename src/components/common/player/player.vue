<template>

  <div class="play-box">
    <div class="play">
      <div class="normal-play" v-show="$store.state.fullScreen">
        <div class="background">
          <div class="filter"></div>
         <img :src="songs" alt="">
        </div>
        <div class="backTop">
          <span class="iconfont icon-fanhui" @click="backing"></span> 
          {{this.$store.state.songnames}}
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-box">
              <div class="cd" :class="paused? 'paused':'play'" >
                <img :src="songs" alt="">
              </div>
            </div>
          </div>
        </div>
         <div class="playPackage">

           <span
            class="iconfont iconshangyishou"
            @click="pre(songid,playid)"
          ></span>
          <span class="iconfont" :class="paused? 'iconbofang':'iconcrm17'" @click="play"></span>
          <span
            class="iconfont iconxiayishou"
            @click="next(songid,playid)"
          ></span>
         </div>
      </div>
      <!-- 播放 -->

      <!-- 移动端audio,video不能自动播放 支持后台播放可以设置隐藏-->
      <!-- <audio controls autoplay loop preload="auto" ></audio> -->
      <!-- {{a}} -->

    </div>
    <audio
      :src="songlist"
      controls
      autoplay
      preload="auto"
      style="width:260px"
      @ended="end(songid, playid)"
      ref="audio"
    ></audio>
  </div>
</template>
<script>
import { mapState, mapMutations,mapGetters, } from 'vuex';
import * as types from "@/store/types";

import store from "@/store/store.js"
export default {
  name: "player",
  data() {
    return {
      id: "",
      url: "",
      paused:false,
      isshow:true
    }
  },
  computed: {
    songlist() {

      return this.$store.state.songUrl;

    },
    songid() {
      return this.$store.state.songid;
    },
    playid() {
      return this.$store.state.playid;
    },
    songs(){    
      return this.$store.state.songs;
    },
  },
  
  methods: {
     backing() {
     this.$store.state.fullScreen=false;
    },
    next(songid, playid) {
      this.id = playid;
      var _this = this;
      for (var i = 0; i < songid.length; i++) {
        if (_this.id == songid[i].id) {
          if (i == songid.length - 1) {
            alert("最后一首")
            return id = songid[i - 1].id

          }
          let id = songid[i + 1].id
          // this.$router.push({ path: `/play/${id}` });
          this.getUrl(id)
          this.getsongPic(id)
        }
      }
    },
    play(){
      // this.$ref.audio
      if(this.$refs.audio.paused){
        this.$refs.audio.play()
        this.paused=false
      }else{
        this.$refs.audio.pause()
        this.paused=true
      }
    },
    end(songid, playid) {
      this.next(songid, playid)
    },
    /*获取歌曲图片*/
     /*获取歌曲图片*/
    getsongPic(id){
     
      var _this=this;
      this.axios.get(`/song/detail?ids=${id}`).then(function(res){
        console.log(res.data);
        var songs=res.data.songs[0].al.picUrl;
        var songnames=res.data.songs[0].name;
        // console.log(songnames)
        _this.$store.commit(types.SONGPIC, songs)
         _this.$store.commit(types.SONGNAME, songnames)
      })
    },
    getUrl(id) {
      var _this = this;
      this.axios.get(`song/url?id=${id}`).then(function (response) {
        console.log(response);
        _this.url = response.data.data[0].url;
        console.log(_this.url);
        _this.$store.commit(types.SONGURL, _this.url)
      });
      this.$store.commit(types.PLAYID, id)
      this.axios.get(`/lyric?id=${this.$store.state.playid}`).then(function (response) {
        console.log(response);

      });
    },
    pre(songid, playid) {
      this.id = playid;
      var _this = this;
      for (var i = 0; i < songid.length; i++) {
        if (_this.id == songid[i].id) {

          if (i == 0) {
            alert("这是第一首")
            return id = songid[0].id;
          }
          let id = songid[i - 1].id

          // this.$router.push({ path: `/play/${id}` });
          this.getUrl(id)
          this.getsongPic(id)
        }
      }

    },

  },
}
</script>
<style scoped>
.normal-play {
  height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1111;
  background: #f2f3f4;
  display: flex;
    flex-direction: column;
       /* justify-content: space-around; */
}
.background{
 position: absolute;
    left: -50%;
    top: -50%;
    width: 300%;
    height: 300%;
    z-index: -1;
    opacity: .6;
    -webkit-filter: blur(30px);
    filter: blur(30px);
}
.background .filter{
  filter: blur(30px);
  height: 100%;
  width: 100%;
    background: #000;
  opacity: .6;
  position: absolute;
}
.background img{
  width: 100%;
  height: 100%;
}
.backTop{
  color: white;
  display: flex;
  align-items: center;
}
.play span {
  color: white;
  font-size: 70px;
  z-index: 10;
}
audio{
  position: absolute;
  top: 50%;
  z-index: -3;
  visibility: hidden;
}
.middle{
  width: 100%;
 margin-bottom: 140px;
 height: 800px;
 display: flex;
 align-items: center;
 justify-content: center;
 margin-top: 184px;
}
.middle .cd-box{
  width: 80%;
  margin: auto;
}
.middle .cd{
  border-radius: 50%;
  border: 15px solid hsla(0,0%,100%,.1);
   
}
.middle .play{
  animation: rotate 20s linear infinite
}
.middle .paused{
  animation-play-state:paused;
}
.middle img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
@keyframes rotate{
  0%{
    transform: rotate(0)
  }
  100%{
    transform: rotate(1turn)
  }
}
.playPackage{
      display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
