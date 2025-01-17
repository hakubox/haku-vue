import Axios, { AxiosRequestConfig } from 'axios'; 
import { get, post } from '@/tools/common';

/** 获取成本列表-参数 */
export interface GetProductListParams {
    /** 页码 */
    pageNum: number;
    /** 单页数量 */
    pageSize: number;
    /** 检索条件支持，产品编码和产品名称 */
    searchText?: string;
    /** 供应商名称 */
    supplier?: string;
}


/** 获取成本列表-方法 */
export function GetProductList(params: GetProductListParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Product/GetProductList`, params, conf);
}


/** 获取品牌List-参数 */
export interface GetBrandListParams {
}


/** 获取品牌List-方法 */
export function GetBrandList(params?: GetBrandListParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Product/GetBrandList`, params, conf);
}


/** 获取分类列表-参数 */
export interface GetCategoryListParams {
}


/** 获取分类列表-方法 */
export function GetCategoryList(params?: GetCategoryListParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Product/GetCategoryList`, params, conf);
}


/** 获取供应商列表-参数 */
export interface GetSupplierListParams {
}


/** 获取供应商列表-方法 */
export function GetSupplierList(params?: GetSupplierListParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Product/GetSupplierList`, params, conf);
}


/** 添加或编辑产品-参数 */
export interface AddOrEditProductParams {
    /** ID */
    id?: string;
    /** 中文产品名 */
    name: string;
    /** 英文产品名 */
    enname?: string;
    /** 类别ID */
    categoryid?: string;
    /** 类别名称 */
    categoryname?: string;
    /** 规格 */
    norm: string;
    /** 品牌ID */
    brandid: string;
    /** 品牌名称 */
    brandname?: string;
    /** 单位 */
    unit: string;
    /** 单价 */
    price: number;
    /** 系数 */
    ratio: number;
    /** 数量 */
    number?: number;
    /** 供应商ID */
    supplierid: string;
    /** 供应商名称 */
    suppliername?: string;
    /** 产品编码 */
    code?: string;
    /** 备注 */
    remark?: string;
    /** 添加时间 */
    createtime?: string;
}


/** 添加或编辑产品-方法 */
export function AddOrEditProduct(params: AddOrEditProductParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Product/AddOrEditProduct`, params, conf);
}


/** 删除产品-参数 */
export interface DeleteProductParams {
    /** 产品ID */
    id: string;
}


/** 删除产品-方法 */
export function DeleteProduct(params: DeleteProductParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Product/DeleteProduct`, params, conf);
}


/** 通过产品ID获取库存信息列表-参数 */
export interface GetInventorylogListParams {
    /** 产品ID */
    productid?: string;
}


/** 通过产品ID获取库存信息列表-方法 */
export function GetInventorylogList(params?: GetInventorylogListParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Product/GetInventorylogList`, params, conf);
}


/** 新增库存操作记录-参数 */
export interface AddInventorylogParams {
    /** 产品ID */
    productid: string;
    /** 动作，，出库或入库 */
    action: string;
    /** 数量 */
    number: number;
    /** 操作时间 */
    operatingtime: string;
    /** 仓库或来源的内容 */
    marking: string;
}


/** 新增库存操作记录-方法 */
export function AddInventorylog(params: AddInventorylogParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Product/AddInventorylog`, params, conf);
}


/** 通过产品ID获取产品图片列表-参数 */
export interface GetProductImgListParams {
    /** 产品ID */
    productid: string;
}


/** 通过产品ID获取产品图片列表-方法 */
export function GetProductImgList(params: GetProductImgListParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Product/GetProductImgList`, params, conf);
}


/** 通过产品图片ID删除某个图片-参数 */
export interface DeleteProductImgParams {
    /** 图片ID */
    imgid: string;
}


/** 通过产品图片ID删除某个图片-方法 */
export function DeleteProductImg(params: DeleteProductImgParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Product/DeleteProductImg`, params, conf);
}


/** 产品图片上传模块-参数 */
export interface AddProductImgParams {
    /** 产品ID */
    productid: string;
    /** 文件ID */
    fileid: string;
}


/** 产品图片上传模块-方法 */
export function AddProductImg(params: AddProductImgParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Product/AddProductImg`, params, conf);
}


/** 通过产品ID获取产品标签列表-参数 */
export interface GetProductTagListParams {
    /** 产品ID */
    productid: string;
}


/** 通过产品ID获取产品标签列表-方法 */
export function GetProductTagList(params: GetProductTagListParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/Product/GetProductTagList`, params, conf);
}


/** 通过产品标签ID删除某个标签-参数 */
export interface DeleteProductTagParams {
    /** 标签ID */
    tagid: string;
}


/** 通过产品标签ID删除某个标签-方法 */
export function DeleteProductTag(params: DeleteProductTagParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Product/DeleteProductTag`, params, conf);
}


/** 产品标签添加功能-参数 */
export interface AddProductTagParams {
    /** 产品ID */
    productid: string;
    /** 标签内容 */
    name: string;
}


/** 产品标签添加功能-方法 */
export function AddProductTag(params: AddProductTagParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/Product/AddProductTag`, params, conf);
}


/** dtoOrder */
export interface dtoOrder {
    /** 信息在Excel中的行数 */
    index?: number;
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


/** 产品信息操作模块 */
export default {
    GetProductList,
    GetBrandList,
    GetCategoryList,
    GetSupplierList,
    AddOrEditProduct,
    DeleteProduct,
    GetInventorylogList,
    AddInventorylog,
    GetProductImgList,
    DeleteProductImg,
    AddProductImg,
    GetProductTagList,
    DeleteProductTag,
    AddProductTag,
}
