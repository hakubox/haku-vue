import Axios, { AxiosRequestConfig } from 'axios'; 
import { get, post } from '@/tools/common';
import { pageFilter } from "@/@types/basic";

/** 获取Token认证信息-参数 */
export interface GetTokenParams {
    /**  */
    name: string;
    /**  */
    password: string;
}


/** 获取Token认证信息-方法 */
export function GetToken(params: GetTokenParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Authorize/GetToken`, params, conf);
}


/** 系统访问授权模块 */
export default {
    GetToken,
}
