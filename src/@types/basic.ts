import { pageFilter, Breadcrumb } from "@/@types/basic";

/** 分页参数 */
export interface pageFilter {
    /** 每页数据条数 */
    pageSize: number;
    /** 当前页数 */
    pageNum: number;
}

/** 面包屑 */
export interface Breadcrumb {
    /** 标签文本 */
    title: string,
    /** 跳转地址 */
    url?: string,
    /** 图标 */
    icon?: string,
    /** 点击事件 */
    click?: Function
}

/** 用户信息 */
export interface UserInfo {
    id?: string,
    name?: string,
    rolename?: string,
    nickname?: string,
    phone?: string,
    email?: string,
    createtime?: Date | number
}