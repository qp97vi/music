// store index.js
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        xsrfCookieName: null,
        title: '',
        uId:'',//用户id
        // songtips:''//歌单编辑提示
        songUrl:'',//歌曲url
        songTitle:'首页',
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.xsrfCookieName = data;
            state.xsrfCookieName = data;
        },
        [types.LOGOUT]: (state) => {//退出登录
            localStorage.removeItem('xsrfCookieName');
            state.xsrfCookieName = null;
           
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        },
        [types.UID]:(state,data)=>{
            localStorage.uId=data;
            state.uId=data;
        },
        [types.SONGURL]: (state,data) => {
            state.songUrl=data;
        },
        [types.SONGTITLE]: (state,data) => {
            state.songTitle=data;
        }
    }
})