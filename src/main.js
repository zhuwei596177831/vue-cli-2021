import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Less from 'less'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from '@/App.vue'
import store from '@/store'
import router from '@/route'

import {token} from '@/config/constants.js'

//全局的 axios 默认值
axios.defaults.baseURL = 'http://127.0.0.1:8082/demo/axios';
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.common['Token'] = token + '88888';
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

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
