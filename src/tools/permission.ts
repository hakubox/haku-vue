import axios from "axios";
import { getToken } from "@/tools/common";

/**
 * 用户权限
 */
let permissions: any = [];

/**
 * 初始化获取所有权限
 */
export async function initPermissions() {
    const userid = localStorage.getItem('user_id');
    axios.get(process.env.VUE_APP_PERMISSION_INTERFACE, {
        headers: {
            Authorization: getToken()
        },
        params: {
            user: userid
        }
    }).then(d => new Promise(function(resolve, reject) {
        resolve(d);
    })).catch(err => {
        throw new Error('用户权限获取失败。');
    });
}

/**
 * 获取所有权限
 */
export function getAllPermissions() {
    return permissions;
}

/**
 * 删除权限
 */
export function removePermissions() {

}