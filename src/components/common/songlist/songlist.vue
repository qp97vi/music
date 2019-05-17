<template>
  <div class="songlist">
    <div class="title">
      {{title}}
    </div>
    <ul class="Box">
      <li
        v-for="(item,index) in songlist"
        v-if="index<12"
        @click="open(item.id)"
      >
        <div class="imgBox">
          <img
            v-lazy="item.picUrl"
            alt=""
          >
          <em>{{Math.round((item.playCount/10000)*100/100)}}万</em>
        </div>
        <span>{{item.name}}</span>

      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songlist: [],
      title: '热门歌单:',

    }
  },
  methods: {
    getSongList() {
      var _this = this;
      this.axios.get('personalized').then(function (response) {
        // console.log(response);
        _this.songlist = response.data.result;

      })

    },
    //查看歌单详情
    open(id) {
      console.log(id);
      this.$emit('jump', id);

      //  this.$store.commit(types.SONGTIPS,id);

    }
    //  getMusicList(){
    //     var _this=this;
    //    this.axios.get('http://192.168.1.29:3000/personalized/newsong').then(function(response){
    //        console.log(response);
    //        _this.musicList=response.data.result
    //       _this.songName=JSON.parse(response.data.result.song.alias)
    //        console.log(_this.songName);

    //    })

    // },
  },
  created() {
    this.getSongList()
    // this.getMusicList()  
  },
}
</script>
<style scoped>
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.music {
  padding-bottom: 106px;
}
.title {
  padding-left: 32px;
  margin: 10px 0;
}
.Box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.Box li {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: auto;
  margin-bottom: 10px;
}
.Box span {
  display: inline-block;
  height: 60px;
  font-size: 24px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.imgBox {
  width: 240px;
  height: 240px;
  position: relative;
}
.imgBox em {
  position: absolute;
  top: 0;
  right: 0;
  color: #ffffff;
  font-size: 20px;
}
.Box img {
  width: 100%;
  height: 100%;
}
</style>
