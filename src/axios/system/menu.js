import request from '@/axios/request'
import {urlencoded_content_type} from "@/config/constants";

/**
 * 菜单树
 * @returns {Promise<unknown>}
 */
export function menuTrees() {
    return request({
        url: '/system/menu/menuTrees',
        method: 'post'
    });
}

/**
 * 用户权限菜单
 * @returns {Promise<unknown>}
 */
export function userMenus() {
    return request({
        url: '/system/menu/userMenus',
        method: 'post'
    });
}

/**
 * 菜单列表
 * @param data
 * @returns {Promise<unknown>}
 */
export function menuList(data) {
    return request({
        url: '/system/menu/menuPageList',
        method: 'post',
        data: data,
        headers: {'content-type': urlencoded_content_type}
    });
}

/**
 * 添加菜单
 * @param data
 * @returns {Promise<unknown>}
 */
export function addMenu(data) {
    return request({
        url: '/system/menu/addMenu',
        method: 'post',
        data: data
    });
}

/**
 * 修改菜单
 * @param data
 * @returns {Promise<unknown>}
 */
export function updateMenu(data) {
    return request({
        url: '/system/menu/updateMenu',
        method: 'put',
        data: data
    });
}

/**
 * 删除菜单
 * @param data
 * @returns {Promise<unknown>}
 */
export function deleteMenu(data) {
    return request({
        url: `/system/menu/deleteMenuById/${data}`,
        method: 'delete'
    });
}

/**
 * 菜单类型
 * @returns {Promise<AxiosResponse<T>>}
 */
export function menuTypes() {
    return request({
        url: '/system/menu/menuTypes',
        method: 'post'
    });
}

/**
 * 根据菜单类型查询 上级菜单列表下拉数据
 * @param data
 */
export function parentMenus(data) {
    return request({
        url: '/system/menu/parentMenus',
        method: 'post',
        data: data,
        headers: {'content-type': urlencoded_content_type}
    });
}

export function cascaderTrees(data) {
    return request({
        url: '/system/menu/cascaderTrees',
        method: 'post',
        data: data,
        headers: {'content-type': urlencoded_content_type}
    });
}