import request from '@/axios/request'
import {urlencoded_content_type} from "@/config/constants";

/**
 * 角色列表
 * @param data
 * @returns {Promise<unknown>}
 */
export function roleList(data) {
    return request({
        url: '/system/role/rolePageList',
        method: 'post',
        data: data,
        headers: {'content-type': urlencoded_content_type}
    });
}

/**
 * 添加角色
 * @param data
 * @returns {Promise<unknown>}
 */
export function addRole(data) {
    return request({
        url: '/system/role/addRole',
        method: 'post',
        data: data
    });
}

/**
 * 修改角色
 * @param data
 * @returns {Promise<unknown>}
 */
export function updateRole(data) {
    return request({
        url: '/system/role/updateRole',
        method: 'put',
        data: data
    });
}

/**
 * 删除角色
 * @param data
 * @returns {Promise<unknown>}
 */
export function deleteRole(data) {
    return request({
        url: `/system/role/deleteRoleById/${data}`,
        method: 'delete'
    });
}

/**
 * 菜单树
 * @returns {Promise<unknown>}
 */
export function getMenuTrees() {
    return request({
        url: '/system/menu/getMenuTrees',
        method: 'post'
    });
}

/**
 * 角色分配菜单
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export function permissionRoleMenus(data) {
    return request({
        url: '/system/role/permissionRoleMenus',
        method: 'post',
        data: data
    });
}

/**
 * 角色下拉数据
 * @returns {Promise<AxiosResponse<T>>}
 */
export function findAllRoles() {
    return request({
        url: '/system/role/findAllRoles',
        method: 'post'
    });
}