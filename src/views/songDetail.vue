<template>
  <div class="songDetail">
    <sidetop></sidetop>
    <div
      class="bgFilter"
      :style="{backgroundImage: `url(${SongList ? SongList.coverImgUrl: ''})`}"
    ></div>
    <div class="content">
      <div class="imgBox">
        <img
          :src="SongList.coverImgUrl"
          alt=""
        >
        <em>{{playCount}}万</em>
      </div>
      <div class="contentRight">
        <span>{{SongList.name}}</span>

        <div class="iconBox">
          <img
            :src="creator.avatarUrl"
            alt=""
          >
          <span>{{creator.nickname}}</span>
        </div>

      </div>
    </div>
    <ul>
      <div class="list-header">
        <div class="headerLeft">
          <span class="iconfont icon-bofang"></span>
          <em>播放全部</em>
          <em>共{{SongList.trackCount}}首</em>
        </div>
        <div class="headerRight">
          {{SongList.subscribedCount}}人收藏
        </div>
      </div>
      <li
        v-for="(item,index) in song"
        @click="play(item.id,index)"
      >
        <div class="songLeft">
          {{index+1}}
        </div>
        <div class="songRight">
          <div>
            <em>{{item.name}}</em>
            <em v-for="(item,index) in item.alia">{{item}}</em>
          </div>
          <div><em v-for="(item,index) in item.ar">{{item.name}}</em></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
// import store from '../store/store'
import * as types from '../store/types'
import sidetop from "@/components/common/sideTop";
import player from "@/components/common/player/player";
// import { mapMutations } from 'vuex'
export default {
  name: "songDetail",
  data() {
    return {
      id: "", //歌单id
      SongList: "",
      creator: "",
      playCount: "",
      song: "",
      alia: "",
      songid: [],//歌曲列表
      playlist: {
        tracks: [],
        creator: {},
      },
    };
  },
  computed: {
    songlists() {
      return this.$store.state.songUrl
    },
    playid() {
      return this.$store.state.playid;
    },
  },
  methods: {
    backing() {
      this.$router.go(-1);
    },
    play(id, index) {
      //播放
      // this.$router.push({ path: `/play/${id}` });
      var _this = this
      this.$store.commit(types.PLAYID, id)
      this.axios.get(`song/url?id=${id}`).then(function (response) {
        // console.log(response);
        _this.url = response.data.data[0].url;
        // console.log(_this.url);
        _this.$store.commit(types.SONGURL, _this.url)
        // console.log(_this.url);
        //  _this.$refs.audio.src=JSON.stringify(_this.url)
      });
    }
  },
  // computed:{
  // 		title(){
  // 			return this.$store.state.songtips
  // 		}
  // 	},
  mounted() {
    this.$store.commit(types.SONGTITLE, '歌单')

  },
  created() {

    this.id = this.$route.params.id;

    var _this = this;
    this.axios.get(`playlist/detail?id=${this.id}`).then(function (response) {
      // console.log(response);
      _this.SongList = response.data.playlist;
      _this.playlist = response.data.playlist;
      _this.creator = response.data.playlist.creator;
      _this.playCount = Math.round(
        ((response.data.playlist.playCount / 10000) * 100) / 100
      );
      // console.log(_this.playCount);
      _this.song = response.data.playlist.tracks;
      _this.alia = response.data.playlist.tracks.alia;

      _this.songid = response.data.playlist.trackIds;
      // console.log(_this.songid)
      _this.$store.commit(types.SONGID, _this.songid);
    });

  },
  components: {
    sidetop,
    player
  }
};
</script>
<style scoped>
.songDetail {
  display: flex;
  flex-direction: column;
}
.songTop span {
  font-size: 52px;
}
.imgBox {
  position: relative;
  width: 300px;
  height: 300px;
  float: left;
  margin-right: 28px;
}
.imgBox em {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 20px;
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
img {
  width: 100%;
  height: 100%;
}
.content {
  margin-top: 100px;
  padding: 30px;
  color: #fff;
}
.contentRight {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}
.contentRight span {
  font-size: 28px;
}
.contentRight span:first-child {
  display: inline-block;
  width: 300px;
}
.contentRight .iconBox {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.contentRight .iconBox span {
  font-size: 24px;
}
.contentRight img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.bgFilter {
  position: absolute;
  top: 0;
  height: 600px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  z-index: -1;
  filter: blur(8vw);
}
ul {
  margin-top: 70px;
  /* display: flex;
    flex-direction: column; */
  /* height: 50%; */
  /* overflow: auto; */
  background: #fff;
  border-radius: 20px 20px 0 0;
}
li {
  display: flex;
  align-items: center;
  /* height: 100px; */
}
.list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 22px 0 16px;
}
.headerLeft {
  display: flex;
  align-items: center;
}
.list-header span {
  font-size: 60px;
  margin-right: 20px;
}
.songRight {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  margin-top: 20px;
}
.songRight div {
  width: 620px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 28px;
}

.songRight div:last-child {
  padding-bottom: 20px;
}
.songLeft {
  width: 60px;
  padding: 0 20px;
  text-align: center;
}
</style>