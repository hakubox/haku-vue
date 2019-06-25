import Axios, { AxiosRequestConfig } from 'axios'; 
import { get, post } from '@/tools/common';

/** 通过用户ID获取功能列表-参数 */
export interface GetFuncationListByUserIdParams {
    /** 用户ID */
    userid?: string;
}


/** 通过用户ID获取功能列表-方法 */
export function GetFuncationListByUserId(params?: GetFuncationListByUserIdParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Funcation/GetFuncationListByUserId`, params, conf);
}


/** 系统功能操作模块 */
export default {
    GetFuncationListByUserId,
}
