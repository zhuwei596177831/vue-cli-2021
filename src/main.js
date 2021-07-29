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
import VueCookies from 'vue-cookies'
import Fragment from 'vue-fragment'


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Less);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.use(Fragment.Plugin);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
