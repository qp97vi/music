<template>
   <div id="page">
        <div class="friend">
        朋友
    </div>
    <v-footer></v-footer>
   </div>
</template>
<script>
import vfooter from "@/components/common/footer/footer";
export default {
    name:'friend',
    data() {
        return {
            
        }
    },
    components:{
       "v-footer": vfooter,
    },
    // created() {
    //     this.axios.get(`http://192.168.1.28:3000/event`).then(function(response){
    //         console.log(response);
            
    //     })
    // },
}
</script>
<style scoped>

</style>
