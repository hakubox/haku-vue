import Axios, { AxiosRequestConfig } from 'axios';
import { pageFilter } from "@/@types/basic";

const namespace = 'user/';

/** 新增用户-参数 */
export interface AddUserParams {
    /** 用户名 */
    userName: string;
    /** 年龄 */
    age: number;
}

/** 获取用户列表-参数 */
export interface GetUserListParams extends pageFilter {
    /** 用于筛选的用户名 */
    UserName?: string;
}

/**
 * 增加新用户
 * @param {object} params 参数
 * @param {object} [conf] 配置
 * @return {Promise}
 */
export function AddUser(params: AddUserParams, conf: AxiosRequestConfig = {}): Promise<any> {
    return Axios.get(`${namespace}/AddUser`, {
        params: { ...params },
        ...conf
    });
}
/** 获取用户列表 */
export function GetUserList(params: GetUserListParams, conf: AxiosRequestConfig = {}): Promise<any> {
    return Axios.post(`${namespace}/GetUserList`, params, conf);
}

export default {
    AddUser,
    GetUserList
};
