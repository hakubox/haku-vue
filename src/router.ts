import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/', 
            redirect: '/login'
        }, {
            path: '/login', name: 'login',
            meta: { title: '登录' },
            component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        }, {
            path: '/about', name: 'about',
            meta: { title: '关于' },
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }, {
            path: '/front',
            meta: { },
            component: () => import(/* webpackChunkName: "front" */ './views/Front.vue'),
            children: [
                {
                    path: 'cost', name: 'cost',
                    meta: { 
                        title: '成本管理',
                        permission: ['cost']
                    },
                    component: () => import(/* webpackChunkName: "front" */ './views/Cost/CostList.vue')
                }, {
                    path: 'quotedprice', name: 'quotedprice',
                    meta: { 
                        title: '报价信息管理'
                    },
                    component: () => import(/* webpackChunkName: "front" */ './views/Quotedprice/QuotedpriceList.vue')
                }, {
                    path: 'inventory', name: 'inventory',
                    meta: { title: '库存管理' },
                    component: () => import(/* webpackChunkName: "front" */ './views/Inventory/InventoryList.vue')
                }, {
                    path: 'usermanager', name: 'usermanager',
                    meta: { title: '用户管理' },
                    component: () => import(/* webpackChunkName: "front" */ './views/User/UserManager.vue')
                }, 
                // 特殊页面
                {
                    path: '403', name: '403',
                    meta: { title: '没有权限' },
                    component: () => import('./views/Sys/403.vue')
                }, {
                    path: '404', name: '404',
                    meta: { title: '页面不存在' },
                    component: () => import('./views/Sys/404.vue')
                }, {
                    path: '*', redirect: '404'
                }
            ]
        }
    ]
});
