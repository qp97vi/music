// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/font/iconfont.css'

import axios from 'axios'
import 'mint-ui/lib/style.css'


import { Spinner ,InfiniteScroll,Swipe, SwipeItem,Range } from 'mint-ui';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/loading.gif'),
  loading: require('./assets/loading.gif'),
  attempt: 1
})

import store from './store/store';

Vue.use(InfiniteScroll);


Vue.component(Spinner.name, Spinner);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Range.name, Range);

import 'mint-ui/lib/style.css'
axios.defaults.baseURL='http://106.13.43.60:3000/'
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