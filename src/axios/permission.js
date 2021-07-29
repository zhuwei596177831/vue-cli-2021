import {urlencoded_content_type} from "@/config/constants";
import request from '@/axios/request';

/**
 * 权限控制——按钮——角色
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 * @constructor
 */
export function hasRoles(data) {
    return request({
        url: '/system/permission/hasRoles',
        method: 'post',
        data: data
    });
}

/**
 * 权限控制——按钮——菜单
 * @returns {Promise<AxiosResponse<T>>}
 * @constructor
 * @param code
 */
export function hasPermission(code) {
    return request({
        url: '/system/permission/hasPermission',
        method: 'post',
        data: {
            code: code
        },
        headers: {'content-type': urlencoded_content_type}
    });
}
