import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { notification, message } from 'ant-design-vue';
import qs from 'qs';
import router from '../router';

export function getToken(): string {
    return 'Bearer ' + localStorage.getItem('Authorization');
};

declare module 'axios' {
    interface AxiosRequestConfig {
        /** 用于撤销请求的函数 */
        cancel?: Function;
    }
}

/**
 * 日期格式化
 * @param {Date} [date=new Date()] 日期
 * @param {string} [fmt='yyyy-MM-dd'] 格式化参数
 * @return {string} 格式化后的日期
 */
export function dateFormat(date: Date = new Date(), fmt: string = "yyyy-MM-dd"):string {
    if (!date) return "";
    let o:object = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "H+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    let _fmt = fmt;
    if(/(y+)/.test(fmt))
        _fmt = _fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(_fmt))
            _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return _fmt;
};

Date.prototype.format = function(fmt = 'yyyy-MM-dd') {
    return dateFormat(this, fmt);
}

export function getLocalstorge(item: string): string | null {
    return window.localStorage.getItem(item) || null;
};

export function v(obj: any, property: string) {
    let propertys = property.split('.'),
		re = obj;
	for(let i = 0;i < propertys.length;i++) {
		if(re instanceof Array) {
			let index = Number(propertys[i]);
            re = re[index < 0 ? (re.length + index) : index];
        } else if(/.*\(.*\)/.test(propertys[i])) {
            let exp = /(.*)\((.*)\)/.exec(propertys[i]);
            if(exp !== null) {
                let _propertys = Function(`return [${exp[2]}]`)();
                re = re[exp[1]].apply(null, _propertys);
            } else {
                return re;
            }
        } else {
            if(re[propertys[i]]) re = re[propertys[i]];
            else break;
        }
		if(re === undefined || re === null) return re;
    }
	return re;
};

export function initAPI(api: object) {
    let re = {};
    const fn = (parent: any, reParent: any, url: string) => {
        if (parent) {
            Object.keys(parent).forEach((key: string) => {
                if (parent[key]) {
                    if (typeof parent[key] !== 'function') {
                        reParent[key] = {};
                        fn(parent[key], reParent[key], `${url.endsWith('/') ? (url + '/') : url}${key}`);
                    } else {
                        reParent[key] = parent[key].bind(`${url}/${key}/`);
                    }
                }
            });
        }
    };
    fn(api, re, '');
    return re;
};

let loginExpired = false;

export function get(url: string, params?: object, config: AxiosRequestConfig = {}):Promise<any> {
    loginExpired = false;
    return new Promise(function(resolve, reject) {
        axios.get(url, {
            cancelToken: new axios.CancelToken(cancel => config.cancel = cancel),
            params: params,
            ...config,
            headers: {
                Authorization: localStorage.getItem('Authorization') || '',
                ...config.headers
            },
        }).then(d => {
            resolve(d.data);
        }).catch(err => {
            if(err.response.status == 401) {
                if(!loginExpired) {
                    router.replace('/login');
                    // message.info('登录超时，请重新登陆。');
                    notification.warning({
                        message: '系统提示',
                        description: '登录超时，请重新登陆。',
                    });
                    loginExpired = true;
                } else {
                    setTimeout(() => {
                        loginExpired = false;
                    }, 1000);
                }
                reject(err);
                return;
            }
            if(err.message && err.response.data) {
                notification.error({
                    message: '请求错误：' + url,
                    description: err.response.data.errMsg,
                });
                console.error(err.response.data.errMsg);
            } else {
                notification.error({
                    message: '请求错误：' + url,
                    description: err.message,
                });
                console.error(err.message);
            }
            reject(err);
        })
    });
};

export function post(url: string, params: any = {}, config: AxiosRequestConfig = {}):Promise<any> {
    return new Promise(function(resolve, reject) {
        let postRequest:Promise<AxiosResponse<any>>;
        if(params instanceof FormData) {
            postRequest = axios.post(url, params, {
                cancelToken: new axios.CancelToken(cancel => config.cancel = cancel),
                ...config,
                headers: {
                    Authorization: localStorage.getItem('Authorization') || '',
                    "Content-Type": "multipart/form-data",
                    ...config.headers
                },
            });
        } else {
            postRequest = axios.post(url, typeof(params) === 'string' ? params : qs.stringify(params), {
                cancelToken: new axios.CancelToken(cancel => config.cancel = cancel),
                ...config,
                headers: Object.assign({
                    Authorization: localStorage.getItem('Authorization') || ''
                }, typeof(params) === 'string' ? {['Content-Type']: 'application/json'} : {['Content-Type']: 'application/x-www-form-urlencoded;charset=UTF-8'},
                config.headers),
            });
        }
        postRequest.then(d => {
            resolve(d.data);
        }).catch(err => {
            if(err.response && err.response.data) {
                notification.error({
                    message: '请求错误：' + url,
                    description: err.response.data.errMsg,
                });
                console.error(err.response.data.errMsg);
            } else {
                notification.error({
                    message: '请求错误：' + url,
                    description: err.message,
                });
                console.error(err.message);
            }
            reject(err);
        });
    });
};

/** 获取默认的分页参数 */
export function getPagination(config: object = {}): object {
    return {
        pageSizeOptions: ['10', '20', '40'],
        showQuickJumper: true,
        showSizeChanger: true,
        defaultCurrent: 1,
        current: 1,
        defaultPageSize: 10,
        ...config
    };
}

/** 将数字插入千分位符 */
export function thousandNum(money: number | string): string {
    if(!isNaN(Number(money))) {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        throw new TypeError('添加千分位符失败，当前参数为：' + money);
    }
}

/** 获取Url参数 */
export function getParams() {
    return new URLSearchParams(location.search.replace(/\?/ig, ""));
}

export default {
    getToken,
    dateFormat,
    getLocalstorge,
    v,
    initAPI,
    get,
    post,
    getPagination,
    thousandNum,
    getParams
};