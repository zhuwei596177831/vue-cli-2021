import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Less from 'less'
import axios from 'axios'
import VueAxios from 'vue-axios'
import md5 from 'blueimp-md5';
import uuid from 'es6-uuid';
import qs from 'qs';

import App from '@/App.vue'
import store from '@/store'
import router from '@/route'

import {signKey, httpMethods, urlencoded_content_type, file_content_type} from '@/config/constants.js'

const [get, post, put, del] = httpMethods;

//全局的 axios 默认值
axios.defaults.baseURL = 'http://127.0.0.1:8082/demo/axios';
//header里传值
// axios.defaults.headers.common['Authorization'] = token;
// axios.defaults.headers.common['Token'] = signKey + '88888';
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // 在发送请求之前添加接口验签数据
        const {url, method, headers, data} = config;
        const contentType = headers['content-type'];
        const time = Math.trunc(new Date().getTime() / 1000);
        headers.time = time;
        let reqData = data;
        if (method === get || method === del) {
            reqData = '';
        } else if (contentType === urlencoded_content_type || contentType === file_content_type) {
            reqData = '';
            if (contentType === urlencoded_content_type) {
                config.data = qs.stringify(data);
            }
        }
        const nonce = uuid(32, 36);
        //nonce 防止sign被抓包截取 后端每次校验nonce唯一
        headers.nonce = nonce;
        headers.sign = md5(signKey + time + nonce + reqData).toLocaleUpperCase();
        return config;
    },
    error => {
        console.log("interceptors", error);
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        // const {status, data} = response;
        // console.log(status);
        // console.log(data);
        return response;
    },
    error => {
        console.log("interceptors", error);
        // 对响应错误做点什么
        return Promise.reject(error);
    });

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Less);
Vue.use(VueAxios, axios);


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
