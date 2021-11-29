/**
 * @author 朱伟伟
 * @date 2021-11-29 14:46:19
 * @description
 */
import {hasRoles, hasPermission} from '@/axios/permission'

export default {
    install(Vue, options) {
        // 1. 添加全局方法或 property
        // Vue.myGlobalMethod = function () {
        // 逻辑...
        // };

        // 2. 添加全局资源
        // Vue.directive('my-directive', {
        //     bind(el, binding, vnode, oldVnode) {
        //         逻辑...
        // }
        // });

        // 3. 注入组件选项
        // Vue.mixin({
        //     created: function () {
        // 逻辑...
        // }
        // });

        // 角色
        Vue.prototype.$hasRoles = function (data) {
        };

        //菜单code
        Vue.prototype.$hasPerm = function (code) {
        };
    }
};