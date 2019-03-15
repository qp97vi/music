<template>
  <div id="page">
    <div class="my">
      <div class="header">
        <img :src="users.avatarUrl" alt="">
        <div class="name">
          <span>{{users.nickname}}</span>
          <em>{{users.signature}}</em>
        </div>
      </div>
      <ul>
        <li><em>动态</em><i>{{users.gender}}</i></li>
        <li><em>关注</em><i>{{users.follows}}</i></li>
        <li><em>粉丝</em><i>{{users.followeds}}</i></li>
        <li><em>资料</em><i></i></li>
      </ul>
      <div
        class="logout"
        @click="logout"
      >退出登录</div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import vfooter from "@/components/common/footer/footer";
import * as types from "../store/types";
export default {
  name: "my",
  data() {
    return {
      users:''
    };
  },
  components: {
    "v-footer": vfooter
  },
  methods: {
    logout() {
      this.$store.commit(types.LOGOUT);

      this.$router.push("./login");
    }
  },
  created() {
    let localDate = window.localStorage.getItem("uId");
     var _this = this;
    this.axios.get(`/user/detail?uid=${localDate}`).then(function(response) {
      console.log(response);
      // _this.playlist = response.data.playlist;
      // _this.playlist.forEach(element => {
      //   if (element.ordered == false) {
      //     _this.ordered.push(element);
      //   } else {
      //     _this.newImported.push(element);
      //   }
      // });
      _this.users=response.data.profile;
    });
  }
};
</script>
<style scoped>
.header{
  height: 120px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
}
.name{
  display: flex;
  flex-direction: column;
}
.name em{
  font-size: 20px;
}
ul{
  display: flex;
  align-items: center;
}
li{
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
img{
  border-radius: 50%;
  width: 100px;
  height: 100px;
  float: left;
}
.logout {
  display: block;
  height: 90px;
  text-align: center;
  line-height: 90px;

  background: red;
  color: #fff;
}
</style>
