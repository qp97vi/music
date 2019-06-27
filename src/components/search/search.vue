<template>
    <div>
        <span class="iconfont iconsousuo" @click="search()"></span>
    </div>
</template>
<script>
export default {
    name:'search',
    data() {
        return {
            
        }
    },
    methods: {
        search(){
            this.$router.push({path:'/search'})
        }
    },
}
</script>
<style scoped>
.iconsousuo{
    position: fixed;
    bottom: 20%;
    right: 20px;
    font-size: 60px;
    z-index: 100;
    padding: 17px 20px;
    background: #fff;
    border-radius: 50%;
    box-shadow:-2px -0px 20px #E8E8E8;
}
</style>
