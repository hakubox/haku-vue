import Axios, { AxiosRequestConfig } from 'axios'; 
import { get, post } from '@/tools/common';
import { pageFilter } from "@/@types/basic";

/** 获取采购单详细信息-参数 */
export interface GetOrderDetailParams {
    /** 文件ID */
    fileid: string;
    /** 区域(国内或国外) */
    region: string;
    /** 系数 */
    ratio: string;
}


/** 获取采购单详细信息-方法 */
export function GetOrderDetail(params: GetOrderDetailParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Order/GetOrderDetail`, params, conf);
}


/** -参数 */
export interface ImportOrderDetailParams {
    /** 文件ID */
    fileid: string;
    /** 订单详情信息 */
    orders: Array<dtoOrder>;
}


/** -方法 */
export function ImportOrderDetail(params: Array<ImportOrderDetailParams>, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Order/ImportOrderDetail`, JSON.stringify(params), conf);
}


/** dtoOrder */
export interface dtoOrder {
    /** 序号 */
    id?: string;
    /** 编码 */
    code?: string;
    /** 名称 */
    name?: string;
    /** 规格 */
    norm?: string;
    /** 单位 */
    unit?: string;
    /** 数量 */
    number?: number;
    /** 单价 */
    unitprice?: string;
    /** 总价 */
    totalprice?: string;
    /** 单位成本 */
    unitcost?: string;
    /** 总成本 */
    totalcost?: string;
    /** 利润 */
    profit?: string;
    /** 成本单位 */
    costunit?: string;
    /** 成本名称 */
    costname?: string;
    /** 备注 */
    remark?: string;
    /** 品牌 */
    brand?: string;
    /** 供应商 */
    supplier?: string;
}


/** 采购单相关操作模块 */
export default {
    GetOrderDetail,
    ImportOrderDetail,
}
