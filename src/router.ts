import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/', redirect: '/materiel'
        }, {
            //成本管理
            path: '/materiel', name: 'materiel',
            component: () => import(/* webpackChunkName: "views" */ './views/Materiel/MaterielList.vue')
        }, {
            //报价信息管理
            path: '/quotedprice', name: 'quotedprice',
            component: () => import(/* webpackChunkName: "views" */ './views/Quotedprice/QuotedpriceList.vue')
        }, {
            //库存管理
            path: '/inventory', name: 'inventory',
            component: () => import(/* webpackChunkName: "views" */ './views/Inventory/InventoryList.vue')
        }, {
            //用户管理
            path: '/usermanager', name: 'usermanager',
            component: () => import(/* webpackChunkName: "views" */ './views/User/UserManager.vue')
        }, {
            //登录
            path: '/login', name: 'login',
            component: () => import(/* webpackChunkName: "views" */ './views/Login.vue')
        }, {
            //关于
            path: '/about', name: 'about',
            component: () => import(/* webpackChunkName: "views" */ './views/About.vue')
        }
    ]
});
