<template>
  <div class="play play-box">
    播放
    <div
      v-for="(item,index) in url"
      class=""
    >
      <audio
        :src="item.url"
        autoplay
        preload="auto"
        loop
        controls
      ></audio><!-- 移动端audio,video不能自动播放 支持后台播放可以设置隐藏-->
    </div>

  </div>
</template>
<script>
export default {
  name: "play",
  data() {
    return {
      id: "", //歌曲id
      url: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    //    this.getId();
  },
  methods: {
    getId() {
      var _this = this;
      this.axios.get(`song/url?id=${this.id}`).then(function(response) {
        console.log(response);
        _this.url = response.data.data;
        console.log(_this.url);

        //    console.log(_this.url.data.url);
        //    _this.$refs.audio.src=JSON.stringify(_this.url)
      });
    }
  }
};
</script>
<style scoped>
.play-box {
  display: none;
}
</style>
