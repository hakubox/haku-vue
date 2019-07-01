import Vue, { VNode, VueConstructor } from "vue";
import App from "./App.vue";
import router from "@/config/router";
import store from "@/config/store";
import axios from 'axios';
import "./tools/registerServiceWorker";
import '@/config/enum';
import {} from "@/@types/antd-vue.d";
//公共函数库
import * as common from '@/tools/common';
//全局枚举
require('moment').locale('zn-cn');

//自定义指令
import "@/tools/directives";
//ant-design-vue
import "@/config/components";
import '@/assets/less/variables.less';
//自定义组件库
import components from "@/components/index";
//API
import api from '@/api/index';
//主样式
import '@/assets/scss/basic.scss';
//Fontawesome
import '@fortawesome/fontawesome-pro/scss/fontawesome.scss';
import '@fortawesome/fontawesome-pro/scss/light.scss';
import '@fortawesome/fontawesome-pro/scss/regular.scss';
import '@fortawesome/fontawesome-pro/scss/solid.scss';
//多语言
import VueI18n from 'vue-i18n';
import lang_en from '@/lang/en';
import lang_zn_CN from '@/lang/zh-CN';
import { Breadcrumb } from './@types/basic';
import { Pagination } from 'ant-design-vue/types/pagination';

//let hakuDebug = require('./lib/haku-debug/index').default;


Vue.use(components);

axios.defaults.baseURL = process.env.VUE_APP_INTERFACE;

Vue.config.productionTip = false;
Vue.prototype.$common = common;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$config = {};
Object.defineProperties(Vue.prototype.$config, Object.assign({}, ...Object.entries(process.env).map(([key, value]) => ({ [key.replace('VUE_APP_', '')]: { get() { return process.env[key] } } }))))

//EventBus
const bus = new Vue();
Vue.prototype.$bus = bus;

Vue.use(VueI18n);

let i18n = new VueI18n({
    locale: 'zh-CN',
    fallbackLocale: 'en',
    silentFallbackWarn: true,
    messages: {
        ['en']: { lang_en },
        ['zh-CN']: { lang_zn_CN }
    }
});

Vue.prototype.l = () => {
    return '中英文';
};

(async function () {
    //获取权限
    if(localStorage.getItem('Authorization')) {
        let permissions = await api.funcation.GetFuncationListByUserId();
        store.commit('setPermissions', permissions);

        let userInfo = await api.user.GetUser();
        store.commit('setUserInfo', userInfo);
    } else {
        router.push('/login');
    }

    Vue.mixin({
        renderError(h, err) {
            return h('pre', { style: { color: 'red' }, class: 'ant-alert ant-alert-error'}, err.stack)
        }
    });

    let isPageInit = false;
    //页面跳转校验
    router.beforeEach((to, from, next) => {
        if(!to.meta || !to.meta.permission || store.getters.checkPermissions(to.meta.permission)) {
            if(isPageInit) {
                bus.$emit("routerchange", to);
            } else {
                localStorage.setItem('routerchange', JSON.stringify(to));
            }
            
            next();
        } else {
            next('/front/403');
        }
    });

    let _vue = new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
        data: () => ({
            /** 面包屑 */
            breadcrumbSource: []
        }),
        mounted() {
            isPageInit = true;
        },
        methods: {
            /**
             * @method setBreadcrumb 设置面包屑
             * @param {Array} arr 面包屑路径
             */
            setBreadcrumb(arr: Array<Breadcrumb | string>):void {
                let initArr:Array<any> = [
                    {
                        title: '船舶物料供应系统',
                        url: '/'
                    }
                ];
                this.$set(this, 'breadcrumbSource', initArr.concat(
                    arr.map(i => {
                        if (typeof i == 'string') {
                            return { title: i };
                        } else {
                            return i;
                        }
                    })
                ));
            },
            /** 获取分页器默认属性 */
            getPagination(config: Pagination): Pagination {
                return {
                    pageSizeOptions: ['5', '10', '20', '40'],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    defaultCurrent: 1,
                    current: 1,
                    defaultPageSize: 10,
                    total: 100,
                    ...config
                };
            },
            /** 注销 */
            logout() {
                localStorage.removeItem('Authorization');
                this.$router.push('/login');
            }
        }
    });

    //自研异常监控平台
    // hakuDebug({
    //     vue: _vue,
    //     axios: axios
    // });

    _vue.$mount('#app');
})();