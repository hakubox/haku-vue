import Axios, { AxiosRequestConfig } from 'axios'; 
import { get, post } from '@/tools/common';
import { pageFilter } from "@/@types/basic";

/** 单文件上传接口-参数 */
export interface UploadFileParams {
    /** file */
    file: file;
}


/** 单文件上传接口-方法 */
export function UploadFile(params: UploadFileParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Upload/UploadFile`, params, conf);
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


/** 文件上传控制器 */
export default {
    UploadFile,
}
