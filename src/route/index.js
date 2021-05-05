import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Login from '@/components/Login'
import Index from '@/components/Index'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'index',
            path: '/index',
            component: Index
        }
    ]
});