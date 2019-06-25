import Axios, { AxiosRequestConfig } from 'axios'; 
import { get, post } from '@/tools/common';

/** 单文件上传接口-参数 */
export interface UploadFileParams {
    /** file */
    file: FormData;
}


/** 单文件上传接口-方法 */
export function UploadFile(params: UploadFileParams, conf?: AxiosRequestConfig): Promise<any> {
    return post(`/api/File/UploadFile`, params, conf);
}


/** 通过文件ID获取文件-参数 */
export interface GetFileParams {
    /** 文件ID */
    fileid: string;
}


/** 通过文件ID获取文件-方法 */
export function GetFile(params: GetFileParams, conf?: AxiosRequestConfig): Promise<any> {
    return get(`/api/File/GetFile`, params, conf);
}


/** 文件上传控制器 */
export default {
    UploadFile,
    GetFile,
}
