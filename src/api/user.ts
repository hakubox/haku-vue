import Axios, { AxiosRequestConfig } from 'axios'; 
import { get, post } from '@/tools/common';

/** 添加用户接口-参数 */
export interface AddOrEditUserParams {
    /** ID */
    Id?: string;
    /** 名称 */
    Name: string;
    /** 密码 */
    Password: string;
    /** 角色ID */
    Roleid: string;
    /** 角色名称 */
    Rolename?: string;
    /** 昵称 */
    Nickname?: string;
    /** 电话 */
    Phone?: string;
    /** 邮箱 */
    Email?: string;
    /** 添加时间 */
    Createtime?: string;
}


/** 添加用户接口-方法 */
export function AddOrEditUser(params: AddOrEditUserParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/User/AddOrEditUser`, params, conf);
}


/** 获取用户信息-参数 */
export interface GetUserParams {
    /** 用户ID，可不传 */
    id?: string;
}


/** 获取用户信息-方法 */
export function GetUser(params?: GetUserParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/User/GetUser`, params, conf);
}


/** 通过用户ID删除用户-参数 */
export interface DeleteUserParams {
    /** 用户ID */
    id: string;
}


/** 通过用户ID删除用户-方法 */
export function DeleteUser(params: DeleteUserParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/User/DeleteUser`, params, conf);
}


/** 获取用户数据列表-参数 */
export interface GetUserListParams {
    /** 页码 */
    pageNum: number;
    /** 分页大小 */
    pageSize: number;
}


/** 获取用户数据列表-方法 */
export function GetUserList(params: GetUserListParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/User/GetUserList`, params, conf);
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


/** 用户数据操作模块 */
export default {
    AddOrEditUser,
    GetUser,
    DeleteUser,
    GetUserList,
}
