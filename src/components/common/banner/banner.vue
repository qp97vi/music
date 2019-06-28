<template>
  <div class="banner">
    <mt-swipe
      :auto="4000"
      :prevent="true"
    >
      <mt-swipe-item v-for="(item,index) in banner">
        <img
         
          alt=""
          v-lazy="item.imageUrl"
        >
      </mt-swipe-item>

    </mt-swipe>
    <!-- :src="item.imageUrl" -->
  </div>
</template>
<script>
export default {
  name: 'banner',
  data() {
    return {
      banner: []
    }
  },
  created() {
    var _this = this;
    this.axios.get('banner').then(function (response) {
      _this.banner = response.data.banners
      // console.log(response.data.banners.imageUrl);

    })
  },
}
</script>
<style scoped>
.mint-swipe {
  height: 400px;
  width: 100%;
}

img {
  width: 100%;
  height: 400px;
}
</style>
