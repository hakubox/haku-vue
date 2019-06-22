import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/', redirect: '/front/cost'
        }, {
            path: '/login', name: 'login',
            meta: { title: '登录', ispublic: true },
            component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        }, {
            path: '/about', name: 'about',
            meta: { 
                title: '关于'
            },
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }, {
            path: '/front',
            component: () => import(/* webpackChunkName: "front" */ './views/Front.vue'),
            children: [
                {
                    path: '403', name: '403',
                    meta: { title: '没有权限', ispublic: true },
                    component: () => import('./views/Sys/403.vue')
                }, {
                    path: 'cost', name: 'cost',
                    meta: { 
                        title: '成本管理',
                        permission: ['cast_edit', 'cast_add']
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
                }
            ]
        }
    ]
});
