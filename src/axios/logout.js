import request from '@/axios/request';
import {logoutUrl} from '@/config/constants.js'

/**
 * 退出登录
 * @returns {Promise<unknown>}
 */
export function logout() {
    return request({
        url: logoutUrl,
        method: 'post',
    });
}