<template>
  <div>
    <div class="searchTop">
      <input
        type="text"
        name=""
        id=""
        ref="focus"
        v-model="songName"
        placeholder="请输入歌手或歌曲名"
      >
      <span @click="goback()">取消</span>
    </div>
    <ul
      v-if="songlist.length>0"
      class="songlist"
    >
      <span>搜索"{{songName}}"</span>
      <li
        v-for="(item,index) in songlist"
        @click="bofang(item.id)"
      >
        <div class="">
          <div class="sg-title">{{item.name}}</div>
          <div class="songs">{{item.artists[0].name}}</div>
        </div>
      </li>
    </ul>
    <player v-if="this.$store.state.fullScreen=false"></player>
  </div>
</template>
<script>
import player from '@/components/common/player/player'
import * as types from "@/store/types";

import store from "@/store/store.js"
export default {
  name: 'search',
  data() {
    return {
      songName: undefined,
      songlist: [],
      url: '',
    }
  },
  watch: {
    songName(val) {
      //  this.searchSong()
      if (val) {
        this.searchSong(val)
      } else {
        this.songlist = []
      }
    }
  },
  computed: {
    isplay(){
      return this.$store.state.isplay;
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    searchSong(songName) {
      var _this = this;
      this.axios.get(`/search?keywords=${songName}`).then(function (res) {
        // console.log(res.data.result.songs);
        _this.songlist = res.data.result.songs;
      })
    },
    bofang(id) {
      console.log(id)
      var _this = this;
      this.$store.state.fullScreen = !this.$store.state.fullScreen;
      this.$store.commit(types.PLAYID, id)
      this.axios.get(`song/url?id=${id}`).then(function (response) {
        console.log(response);
        _this.url = response.data.data[0].url;
        // console.log(_this.url);
        _this.$store.commit(types.SONGURL, _this.url)

        _this.getsongPic(id)
        _this.$store.commit(types.ISPLAY, true)


        // console.log(_this.url);
        //  _this.$refs.audio.src=JSON.stringify(_this.url)
      });
    },
    getsongPic(id) {

      var _this = this;
      this.axios.get(`/song/detail?ids=${id}`).then(function (res) {
        console.log(res.data);
        var songs = res.data.songs[0].al.picUrl;
        var songnames = res.data.songs[0].name
        // console.log(songname)
        _this.$store.commit(types.SONGPIC, songs)
        _this.$store.commit(types.SONGNAME, songnames)
      })
    },
  },
  mounted() {
    this.$refs.focus.focus()

  },
  components: {
    player,
  }
}
</script>
<style scoped>
.searchTop {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background: red;
}
.searchTop input {
  height: 50px;
  padding-left: 10px;
  border-radius: 24px;
  border: 2px solid #eeeeee;
  width: 500px;
}
.searchTop span {
  position: absolute;
  margin-left: 310px;
}
.songlist span {
  display: block;
  padding: 20px 0 20px 20px;
  font-size: 20px;
  border-bottom: 1px solid #eeeeee;
}
.songlist li {
  margin: 0 20px;
  padding: 10px 0;
  border-bottom: 2px solid #eeeeee;
  font-size: 20px;
}
</style>
