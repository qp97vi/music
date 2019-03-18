<!--<template>
   <div id="page">
    <div class="friend">
      朋友
    </div>
    <v-footer></v-footer>
  </div>
</template>
 <script>
// import vfooter from "@/components/common/footer/footer";
// export default {
//   name: "friend",
//   data() {
//     return {};
//   },
//   components: {
//     "v-footer": vfooter
//   }
//   // created() {
//   //     this.axios.get(`http://192.168.1.28:3000/event`).then(function(response){
//   //         console.log(response);

//   //     })
//   // },
// };
// </script>
// <style scoped>
// </style>-->
<template>
  <div>
    <div class="icons">
    <mt-swipe
      :auto="4000"
      :prevent="true"
    >
      <mt-swipe-item v-for="(item,index) in pages">
        <div
          class="icon"
          v-for="(item,index) in item"
          :key="index"
        >
          <div class="icon-img">
            <img
              class="icon-imgs"
              v-lazy="item.imgUrl"
            />
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>

      </mt-swipe-item>

    </mt-swipe>

  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IconsList: [
        {
          id: "1",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
          desc: "景点门票"
        },
        {
          id: "2",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png",
          desc: "一日游"
        },
        {
          id: "3",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png",
          desc: "北京必游"
        },
        {
          id: "4",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png",
          desc: "溜娃儿"
        },
        {
          id: "5",
          imgUrl:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20191/0334cf5430b9b5505fd79e2b8d7e8670.png",
          desc: "爬长城"
        },
        {
          id: "6",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png",
          desc: "故宫"
        },
        {
          id: "7",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/e3/67df61427c8e1302.png",
          desc: "茶馆相声"
        },
        {
          id: "8",
          imgUrl:
            "http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20192/23e0e0f2e3ab69f6644e5625b31c35a1.png",
          desc: "女神节特惠"
        },
        {
          id: "9",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/ab/6f7d6e44963c9302.png",
          desc: "泡温泉"
        },
        {
          id: "10",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png",
          desc: "动植物园"
        }
      ],
      pages: [],
    };
  },
  created() {
    let page = Math.ceil(this.IconsList.length / 8);
    console.log(this.page);
    for (var i = 0; i < page; i++) {
      this.pages.push(this.IconsList.slice(i * 8, i * 8 + 8));
    }
    console.log(this.pages);
  },
};
</script>

<style scoped>
.ceshi {
  color: #333;
}
.mint-swipe {
  height: 600px;
}
.icons {
  overflow: hidden;
  height: 0;
  padding-bottom: 50%;
}
.icons .swiper-slide {
  height: 0;
  padding-bottom: 50%;
}
.icon {
  position: relative;
  overflow: hidden;
  width: 25%;
  height: 0;
  float: left;
  padding-bottom: 25%;
}
.icon-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 22px;
}
.icon-imgs {
  height: 100%;
  display: block;
  margin: 0 auto;
}
.icon-desc {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22px;
  line-height: 22px;
  color: #333;
  text-align: center;
}
</style>
