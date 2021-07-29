import Vue from 'vue'
import VueRouter from 'vue-router'
import {err} from "@/config/message";

//Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/index/testTable".
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            name: 'Login',
            path: '/login',
            component: () => import('@/components/Login')
        },
        {
            // name: 'Index',
            path: '/index',
            component: () => import('@/components/Index'),
            children: [
                {
                    name: 'Menu',
                    path: 'menu',
                    component: () => import('@/components/system/menu/MenuList')
                },
                {
                    name: 'Role',
                    path: 'role',
                    component: () => import('@/components/system/role/RoleList')
                },
                {
                    name: 'User',
                    path: 'user',
                    component: () => import('@/components/system/user/UserList')
                },
                //默认展示图表统计
                {
                    path: '',
                    component: () => import('@/components/IndexChart')
                }
            ]
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
});

//导航守卫
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login') {
        const isAuthenticated = Vue.$cookies.get("isAuthenticated");
        if (isAuthenticated === null || isAuthenticated === 'false') {
            err("需要登录");
            next({name: 'Login'});
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
