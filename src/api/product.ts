import Axios, { AxiosRequestConfig } from 'axios';
import { get, post } from '@/tools/common';
import { pageFilter } from "@/@types/basic";

const namespace = '/api/Product/';

/** 新增产品-参数 */
export interface AddOrEditProductParams {
    /** 产品ID */
    userName?: string;
    /** 中文产品名 */
    name?: string;
    /** 英文产品名 */
    enname?: string;
    /** 英文产品名 */
    categoryid?: string;
}

/** 获取产品列表-参数 */
export interface GetProductListParams extends pageFilter {
    /** 产品编码 */
    code?: string;
    /** 产品名称 */
    name?: string;
}

/** 增加/编辑产品 */
export function AddOrEditProduct(params: AddOrEditProductParams, conf: AxiosRequestConfig = {}): Promise<any> {
    return post(`${namespace}AddOrEditProduct`, params, conf);
}

/** 获取产品列表 */
export function GetProductList(params: GetProductListParams, conf: AxiosRequestConfig = {}): Promise<any> {
    return get(`${namespace}GetProductList`, params, conf);
}

export default {
    AddOrEditProduct,
    GetProductList
};
