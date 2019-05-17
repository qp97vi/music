<template>
  <div>
    <sidetop></sidetop>
    {{playid}}
    <div v-if="!songlists">会员专享无法播放</div>
  </div>
</template>
<script>
import * as types from "../store/types";
// import {request} from '../api';
import store from '../store/store';
import sidetop from "@/components/common/sideTop";
import { mapState, mapMutations } from 'vuex';
export default {
  name: "play",
  data() {
    return {
      id: "", //歌曲id
      url: "",
    };
  },
  computed: {
    playid() {
      return this.$store.state.playid;
    },
    songlists() {
      return this.$store.state.songUrl;
    }
  },
  created() {
    // console.log()
    this.getId();
    this.getlyric()
  },
  methods: {
    getId() {
      let id = this.$route.params.id;

      var _this = this;
      this.$store.commit(types.PLAYID, id)
      this.axios.get(`song/url?id=${id}`).then(function (response) {
        // console.log(response);
        _this.url = response.data.data[0].url;
        // console.log(_this.url);
        _this.$store.commit(types.SONGURL, _this.url)
        // console.log(_this.url);
        //  _this.$refs.audio.src=JSON.stringify(_this.url)
      });

    },
    getlyric() {

      this.axios.get(`/lyric?id=${this.$store.state.playid}`).then(function (response) {
        // console.log(response);

      });
      // /lyric?id=33894312
    }

  },
  mounted() {

    this.$store.commit(types.SONGTITLE, '歌曲详情')
    // this.id = this.$route.params.id;
    // console.log(this.id)
  },
  components: {
    sidetop,
  }
};
</script>
<style scoped>
/* audio{

} */
</style>
