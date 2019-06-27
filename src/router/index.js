import Vue from 'vue'
import Router from 'vue-router'
import {
  resolve
} from 'path';
// import home from '@/components/home/home'y
import {
  Indicator
} from 'mint-ui';
import store from '../store/store'
import * as types from '../store/types'
Vue.use(Router)


const routes = [

  {
    path: '/',
    redirect: '/mymusic'
  },
  {
    path: '/mymusic',
    name: 'music',

    component: resolve => {
      Indicator.open('加载中...');
      require.ensure(['@/views/music'], () => {
        resolve(require('@/views/music'))
        Indicator.close()
      })
    }
    // component: ()=>import ('@/components/home/home'),
  },
  {
    path: '/songList',
    name: 'songList',
    meta: {
      requireAuth: true,
    },
    component: resolve => {
      Indicator.open('加载中...');
      require.ensure(['@/views/songList'], () => {
        resolve(require('@/views/songList'))
        Indicator.close()
      })
    }
  },
  // {
  //   path:'/friend',
  //   name:'friend',
  //    meta:{
  //     requireAuth:true,
  //   },
  //   component:resolve=>{
  //     Indicator.open('加载中...');
  //     require.ensure(['@/views/friend'], () => {
  //       resolve(require('@/views/friend'))
  //       Indicator.close()
  //     })
  //   }
  // },
  {
    path: '/my',
    name: 'my',
    meta: {
      requireAuth: true,
    },
    component: resolve => {
      Indicator.open('加载中...');
      require.ensure(['@/views/my'], () => {
        resolve(require('@/views/my'))
        Indicator.close()
      })
    }
  },
  {
    path:'/search',
    name:'search',
    meta:{
      requireAuth:true,
    },
    component:resolve=>{
      Indicator.open('加载中...');
      require.ensure(['@/views/search'],()=>{
        resolve(require('@/views/search'))
        Indicator.close()
      })
    }
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => {
      Indicator.open('加载中...');
      require.ensure(['@/views/login'], () => {
        resolve(require('@/views/login'))
        Indicator.close()
      })
    }
  },
  {
    path: '/songDetail/:id', //歌单详情
    name: 'songDetail',
    component: resolve => {
      Indicator.open('加载中...');
      require.ensure(['@/views/songDetail'], () => {
        resolve(require('@/views/songDetail'))
        Indicator.close()
      })
    },
    // children:[
    //   path:
    // ]


  },
  // {
  //   path:'/play/:id',//歌单详情
  //   name:'play',
  //   component:resolve=>{
  //     Indicator.open('加载中...');
  //     require.ensure(['@/views/playDetail'], () => {
  //       resolve(require('@/views/playDetail'))
  //       Indicator.close()
  //     })
  //   }
  // }
];
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('xsrfCookieName')) {
  store.commit(types.LOGIN, window.localStorage.getItem('xsrfCookieName'))
}
if (window.localStorage.getItem('uId')) {
  store.commit(types.UID, window.localStorage.getItem('uId'))
}
const router = new Router({
  routes,

})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.xsrfCookieName) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})
export default router;
