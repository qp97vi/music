<template>
  <div id="page">
    <div class="music">
      <banner></banner>
      <songlist @jump="goplaylist"></songlist>
      <!-- <div class="groomList">
                <div class="title">
                    {{musicTitle}}
                </div>
                <ul class="Box">
                    <li v-for="(item,index) in musicList" v-if="index<9">
                        <i>{{index}}</i>
                      <div class="musicRight">
                        <div class="top">
                            {{item.name}}
                        </div>
                        <div class="bottom">
                           
                            <em>-{{item.song.alias}}</em>
                        </div>
                      </div>
                    </li>
                </ul>
            </div> -->
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import vfooter from "@/components/common/footer/footer";
import songlist from "@/components/common/songlist/songlist";
import banner from "@/components/common/banner/banner";
import * as types from "../store/types";
export default {
  name: 'music',
  data() {
    return {
      songlist: [],//推荐歌单

      musicTitle: '推荐音乐:',
      musicList: [],
      songName: '',//歌手
      songtips: '',
      playCount: '',
    }
  },
  components: {
    "v-footer": vfooter,
    'banner': banner,
    'songlist': songlist
  },
  methods: {
    goplaylist(item) {
      this.$router.push({ path: `/songDetail/${item}` });
    }
  },
  mounted() {
    this.$store.commit(types.SONGTITLE, "首页")
  },
}
</script>
<style scoped>
#page {
  margin-top: 0px;
  display: flex;
    height: 100%;
    flex-direction: column;
}
.music{
  flex: 1;
  overflow: scroll;
}
</style>

