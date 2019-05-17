<template>

  <div class="play play-box">

    <!-- 播放 -->
    <span @click="pre(songid,playid)">上一首</span>
    <audio
      :src="songlist"
      controls
      autoplay
      loop
      preload="auto"
      style="width:260px"
    ></audio>

    <span @click="next(songid,playid)">下一首</span>
    <!-- 移动端audio,video不能自动播放 支持后台播放可以设置隐藏-->
    <!-- <audio controls autoplay loop preload="auto" ></audio> -->
    <!-- {{a}} -->

  </div>

</template>
<script>
import { mapState, mapMutations } from 'vuex';
import * as types from "@/store/types";
import store from "@/store/store.js"
export default {
  name: "player",
  data() {
    return {
      id: "",
      url: ""
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
    }
  },
  methods: {
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
        }
      }
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
        }
      }

    },

  },
}
</script>
<style scoped>
.play {
  height: 108px;
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 1111;
  /* left: 50%; */
  /* margin-left: -300px; */
  width: 100%;
}
.play span {
}
</style>
