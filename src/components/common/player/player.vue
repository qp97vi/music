<template>

  <div class="play-box" @touchmove.prevent>
    <div class="play">
      <div
        class="normal-play"
        v-show="$store.state.fullScreen"
      >
        <div class="background">
          <div class="filter"></div>
          <img
          :src="songs"
           
            alt=""
          >
        </div>
        <div class="backTop">
          <span
            class="iconfont icon-fanhui"
            @click="backing"
          ></span>
          {{this.$store.state.songnames}}
        </div>
        <div class="middle">
          <div class="middle-l">
            <div
              class="cd-box"
              
            >
              <div
                class="cd"
                :class="paused? 'play':'paused'"
              >
                <img
                  :src="songs"
                 
                 
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
        <div class="tips" v-show="isshow">需要会员才能播放</div>
        <div class="time">
          <em>{{format(currentTime||0)}}</em>
          <mt-range
            :value.sync="currentTime"
            :max="duration"
          >
          </mt-range>
          <em>{{format(duration)}}</em>
        </div>
        <div class="playPackage">

          <span
            class="iconfont iconshangyishou"
            @click="pre(songid,playid)"
          ></span>
          <span
            class="iconfont"
            :class="paused? 'iconcrm17':'iconbofang'"
            @click="play"
          ></span>
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
      @timeupdate="gettime()"
      @canplay="getduration()"
      ref="audio"
    ></audio>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, } from 'vuex';
import * as types from "@/store/types";

import store from "@/store/store.js"
export default {
  name: "player",
  data() {
    return {
      id: "",
      url: "",
      paused: true,
      isshow: false,

      duration: 0,
      currentTime: 0
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
    songs() {
      return this.$store.state.songs;
    },
  },
  methods: {

    backing() {
      this.$store.state.fullScreen = false;
    },
    gettime() {
      // console.log(this.$refs.audio.currentTime)
      this.currentTime = this.$refs.audio.currentTime;
    },
    getduration() {
      this.duration = this.$refs.audio.duration
      console.log(this.$refs.audio.duration)
      // this.getlyric()

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
          this.paused=true;
        }
      }
    },
    play() {
      // this.$ref.audio
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.paused = true
      } else {
        this.$refs.audio.pause()
        this.paused = false

      }

    },
    end(songid, playid) {
      this.next(songid, playid)
    },
    /*获取歌曲图片*/
    /*获取歌曲图片*/
    getsongPic(id) {

      var _this = this;
      this.axios.get(`/song/detail?ids=${id}`).then(function (res) {
        console.log(res.data);
        var songs = res.data.songs[0].al.picUrl;
        var songnames = res.data.songs[0].name;
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
        /*当url为空或者说该歌曲需要vip才能播放 */
        if(_this.url==null){
         _this.isshow=true
         _this.currentTime=0;
          _this.duration=0;
        }else{
          
           _this.$store.commit(types.SONGURL, _this.url)
        }
       
      });
      this.$store.commit(types.PLAYID, id)
      // this.axios.get(`/lyric?id=${this.$store.state.playid}`).then(function (response) {
      //   console.log(response);

      // });
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
          this.paused=true;
        }
      }

    },
    format(interval) {
      // var minute=Math.floor(interval/60 | 0)//分
      // var second=Math.floor(interval%60 )
      // if (second < 10) {
      //   second = '0' + second
      // }
      // return minute + ':' + second
      interval = interval | 0
      let minute = interval / 60 | 0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    /*获取歌词*/
    // getlyric() {

    //   this.axios.get(`/lyric?id=${this.$store.state.playid}`).then(function (response) {
    //     console.log(response);

    //   });
    //   // /lyric?id=33894312
    // }

  },
}
</script>
<style scoped>
.play{
  width: 100%;
}
.tips{
  z-index: 111;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
.normal-play {
  height: 100%;
  width: 100%;
  
  background: #f2f3f4;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
}
.play-box{
position: fixed;
  bottom: 0;
  z-index: 1111;
  display: flex;
  height: 100%;
  width: 100%;
}
.background {
  position: absolute;
  left: -50%;
  top: -50%;
  width: 300%;
  height: 300%;
  z-index: 0;
  opacity: 0.6;
  -webkit-filter: blur(30px);
  filter: blur(30px);
}
.background .filter {
  filter: blur(30px);
  height: 100%;
  width: 100%;
  background: #000;
  opacity: 0.6;
  position: absolute;
}
.background img {
  width: 100%;
  height: 100%;
}
.backTop {
  color: white;
  display: flex;
  align-items: center;
  z-index: 1;
}
.play span {
  color: white;
  font-size: 70px;
  z-index: 10;
}
audio {
  position: absolute;
  top: 50%;
  z-index: -3;
  visibility: hidden;
}
.middle {
  width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 184px;
  margin-bottom: 60px;
}
.middle .cd-box {
  width: 80%;
  margin: auto;
}
.middle .cd {
  border-radius: 50%;
  border: 15px solid hsla(0, 0%, 100%, 0.1);
}
.middle .play {
  animation: rotate 20s linear infinite;
}
.middle .paused {
  animation-play-state: paused;
}
.middle img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
.time {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  color: white;
}
.time em{
  z-index: 1;
}
.time em:first-child {
  margin-right: 10px;
}
.time em:last-child {
  margin-left: 10px;
}
.playPackage {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
