import Vue, { VNode } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import "./registerServiceWorker";
//引入自定义基础ts类型
import { Breadcrumb } from "@/@types/basic";
import { } from "@/@types/antd-vue";
//公共函数库
import * as common from '@/tools/common';
//引入ant-design-vue
import Antd, { Pagination } from 'ant-design-vue';
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
Vue.use(Antd);

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
        let permissions = await common.get('https://easy-mock.com/mock/5cfb370f8115d57ff6ad371c/example/getAllAuthorize');
        store.commit('setPermissions', permissions.data);
    }

    Vue.mixin({
        props: ['permission'],
        created(this:Vue) {
            if(this.permission) {
                if(!this.$store.getters.checkPermissions(this.permission)) {
                    this._render = function() {
                        let node = new this.$vnode.constructor();
                        node.text = '';
                        node.isComment = true;
                        return node;
                    }
                }
            }
        },
        renderError (h, err) {
            return h('pre', { style: { color: 'red' }, class: 'ant-alert ant-alert-error'}, err.stack)
        }
    });

    //页面跳转校验
    router.beforeEach((to, from, next) => {
        if((to.meta && to.meta.ispublic) || store.getters.checkPermissions(to.name)) {
            bus.$emit("routerchange", to);
            next();
        } else {
            next('');
        }
    });

    let _vue = new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
        data: () => ({
            /** 权限 */
            is_manager: false,
            /** 面包屑 */
            breadcrumbSource: []
        }),
        created() {
        },
        methods: {
            /**
             * @method setBreadcrumb 设置面包屑
             * @param {Array} arr 面包屑路径
             */
            setBreadcrumb(arr: Array<Breadcrumb | string>):void {
                this.$set(this, 'breadcrumbSource', [
                    {
                        title: '船舶物料供应系统'
                    }
                ].concat(
                    arr.map(i => {
                        if (typeof i == 'string') {
                            return { title: i };
                        } else {
                            return i;
                        }
                    })
                ));
            },
            /**
             * 修改权限
             */
            roleChange():void {
                this.is_manager = !this.is_manager;
                bus.$emit('rolechange', this.is_manager);
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