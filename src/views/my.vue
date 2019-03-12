<template>
    <div id="page">
        <div class="my">
            <div class="logout" @click="logout">退出登录</div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vfooter from '@/components/common/footer/footer'
import * as types from "../store/types";
export default {
    name:'my',
    data() {
        return {
            
        }
    },
    components:{
        'v-footer':vfooter,
    },
    methods: {
        logout(){
            this.$store.commit(types.LOGOUT,)

            this.$router.push('./login')
        }
    },
}
</script>
<style scoped>
.logout{
   display: block;
   height: 90px;
   text-align: center;
   line-height: 90px;
   
   background: red;
   color: #fff;

}
</style>
