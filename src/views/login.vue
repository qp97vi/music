<template>
  <div class="login">
    <div>
      <label for="">手机号:</label>
      <input
        type="text"
        v-model="tel"
        placeholder="请输入您的电话"
      ></div>
    <div>
      <label for=""> 密码:</label>
      <input
        type="password"
        v-model="psd"
        name=""
        id=""
        placeholder="请输入您的密码"
      >
    </div>
    <div
      class="submit"
      @click="login"
    >登录</div>
  </div>
</template>
<script>
import * as types from "../store/types";
export default {
  name: "login",
  data() {
    return {
      tel: "",
      psd: "",
      xsrfCookieName: "",
      uID: ""
    };
  },

  mounted() {
    this.$store.commit(types.TITLE, "Login");
  },
  methods: {
    login() {
      var _this = this;
      this.axios
        .get(`login/cellphone?phone=${this.tel}&password=${this.psd}`)
        .then(function(response) {
          // handle success
          // console.log(response.data.account.id);

          _this.xsrfCookieName = response.config.xsrfCookieName;
          if (_this.xsrfCookieName) {
            _this.$store.commit(types.LOGIN, _this.xsrfCookieName);
            let redirect = decodeURIComponent(
              _this.$route.query.redirect || "/"
            );
            _this.$router.push({
              path: redirect
            });
            _this.$store.commit(types.UID, response.data.account.id);
          }

          // console.log( _this.musicList);
        })
        .catch(function(error) {
          // handle error
          confirm('账号或密码错误')
        })
        .then(function() {
          // always executed
        });
    }
  }
};
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 100%;
  position: absolute;
  width: calc(100% - 40px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #e6e6e6;
}
.login>div{
  width: 70%;
  margin: 0 auto;
}
label {
  display: inline-block;
  width: 104px;
  text-align: right;
}
.login>.submit{
  width: 20%;
}
.submit {
  height: 80px;
  line-height: 80px;
  padding: 0 40px;
  text-align: center;
  background: red;
  color: white;
  width: 50%;
  margin: 0 auto;
  border-radius: 40px;
}
input {
  height: 60px;
  margin-bottom: 20px;
  padding-left: 10px;
  width: 73%;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
