import request from '@/axios/request'
import {urlencoded_content_type} from "@/config/constants";

/**
 * 用户列表
 * @param data
 * @returns {Promise<unknown>}
 */
export function userList(data) {
    return  request({
        url: '/system/user/userPageList',
        method: 'post',
        data: data,
        headers: {'content-type': urlencoded_content_type}
    });
}

/**
 * 添加用户
 * @param data
 * @returns {Promise<unknown>}
 */
export function addUser(data) {
    return request({
        url: '/system/user/addUser',
        method: 'post',
        data: data
    });
}

/**
 * 修改用户
 * @param data
 * @returns {Promise<unknown>}
 */
export function updateUser(data) {
    return request({
        url: '/system/user/updateUser',
        method: 'put',
        data: data
    });
}

/**
 * 删除用户
 * @param data
 * @returns {Promise<unknown>}
 */
export function deleteUser(data) {
    return request({
        url: `/system/user/deleteUserById/${data}`,
        method: 'delete'
    });
}

/**
 *
 * 查询登录用户信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export function findUser() {
    return request({
        url: '/system/user/findUser',
        method: 'post'
    });
}