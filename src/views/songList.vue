<template>
  <div id="page">
    <div class="songList">
      <em>我的歌单:{{playlist.length}}</em>
      <ul>
        <span>我创建的歌单{{ordered.length}}</span>
        <li
          v-for="(item,index) in ordered"
          @click="open(item.id)"
        >
          <img
            v-lazy="item.coverImgUrl"
            alt=""
          >
          <div class="imgRight">
            <div class="name">{{item.name}}</div>
            <div class="num">{{item.trackCount}}首</div>
          </div>
        </li>
      </ul>
      <ul>
        <span>我收藏的歌单{{newImported.length}}</span>
        <li
          v-for="(item,index) in newImported"
          @click="open(item.id)"
        >

          <img
            :src="item.coverImgUrl"
            alt=""
          >
          <div class="imgRight">
            <div class="name">{{item.name}}</div>
            <div class="num">{{item.trackCount}}首</div>
          </div>
        </li>
      </ul>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import vfooter from "@/components/common/footer/footer";
import * as types from "../store/types";
export default {
  name: "songList",
  data() {
    return {
      playlist: "",
      ordered: [], //创建的歌单
      newImported: [] //收藏的歌单
    };
  },
  components: {
    "v-footer": vfooter
  },
  methods: {
    open(id) {
      // console.log(id);
      this.$router.push({ path: `/songDetail/${id}` });
    }
  },
  created() {
    let localDate = window.localStorage.getItem("uId");
    // console.log(localDate);
    
    // this.id=localDate
    var _this = this;
    this.axios.get(`user/playlist?uid=${localDate}`).then(function(response) {
      // console.log(response);
      _this.playlist = response.data.playlist;
      _this.playlist.forEach(element => {
        if (element.ordered == false) {
          _this.ordered.push(element);
        } else {
          _this.newImported.push(element);
        }
      });
    });
  }
};
</script>
<style scoped>

img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}
li {
  display: flex;
  margin-bottom: 20px;
}
em {
  display: block;
  padding: 20px 20px;
  background: #eeeeee;
}
ul {
  padding: 0 20px 0px 20px;
}
span {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 26px;
}
</style>
