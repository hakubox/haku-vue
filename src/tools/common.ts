import axios from "axios";

export function getToken(): string {
    return 'Bearer ' + localStorage.getItem('user_token');
};

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

export function get(url: string, params?: object, config?: object):Promise<any> {
    return new Promise(function(resolve, reject) {
        axios.get(url, {
            params: {
                token: localStorage.getItem('token'),
                ...params
            },
            ...config
        }).then(d => {
            resolve(d.data);
        }).catch(err => {
            if(err.message && err.response.data) {
                console.error(err.response.data.errMsg);
            }
            reject(err);
        })
    });
};

export function post(url: string, params?: object, config?: object):Promise<any> {
    return new Promise(function(resolve, reject) {
        axios.post(url, {
            token: localStorage.getItem('token'),
            ...params
        }, config).then(d => {
            resolve(d.data);
        }).catch(err => {
            if(err.response && err.response.data) {
                console.error(err.response.data.errMsg);
            }
            reject(err);
        })
    });
};

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

export default {
    getToken,
    dateFormat,
    getLocalstorge,
    v,
    initAPI,
    get,
    post
};