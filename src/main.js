// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/font/iconfont.css'



import axios from 'axios'
import 'mint-ui/lib/style.css'


import { Spinner ,InfiniteScroll,Swipe, SwipeItem} from 'mint-ui';
import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);

import store from './store/store';

Vue.use(InfiniteScroll,Lazyload);


Vue.component(Spinner.name, Spinner);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import 'mint-ui/lib/style.css'
axios.defaults.baseURL='http://192.168.1.110:3000/'
Vue.prototype.axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
