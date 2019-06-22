<template>
    <a-menu v-model="currentmenu" @click="handleClick" class="aside-menu" :selectable="false" :defaultSelectedKeys="['/front/cost']" :openKeys.sync="openKeys" mode="inline" >

        <!-- <a-menu-item key="/cost?isnew=1">新增成本</a-menu-item> -->

        <template v-for="item in menus">
            <a-menu-item v-if="!item.children && checkPermissions(item.permission)" :key="item.key">
                <a-icon type="pie-chart" />
                <span>{{item.title}}</span>
            </a-menu-item>
            <aside-sub-menu v-else :menu-info="item" :user-permissions="allPermissions" :key="item.key"/>
        </template>
    </a-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import { Route } from 'vue-router';

@Component({
    watch: {
        openKeys (val) {
            // console.log('openKeys', val)
        },
    }
})
export default class AsideMenu extends Vue {
    openKeys = ['sub1', 'sub2'];
    @Getter('allPermissions') allPermissions;
    @Getter('checkPermissions') checkPermissions;
    currentmenu: Array<string> = [];
    
    menus = [
        { 
            title: '数据管理', icon: 'appstore', src: 'sub1', children: [
                {
                    title: '成本管理', isGroup: true, permission: ['cost'], children: [
                        { title: '成本列表', permission: ['cost'], src: '/front/cost' }
                    ]
                }, 
                { 
                    title: '库存管理', isGroup: true, permission: ['inventory'], children: [
                        { title: '库存列表', permission: ['inventory'], src: '/front/inventory' }
                    ] 
                }, 
                {
                    title: '报价信息管理', isGroup: true, permission: ['quotedprice'], children: [
                        { title: '报价信息计算', permission: ['quotedprice'], src: '/front/quotedprice' }
                    ]
                }
            ]
        }, {
            title: '系统设置', icon: 'setting', src: 'sub2', children: [
                { 
                    title: '用户管理', permission: ['usermanager'], src: '/front/usermanager'
                }
            ]
        }
    ];

    mounted() {
        this.$bus.$on('routerchange', (to: Route) => {
            let queryArr = Object.entries(to.query);
            this.currentmenu = [ to.path + (queryArr.length ? ('?' + queryArr.map(([key, value]) => key + '=' + value).join('&')) : '') ];
            console.warn(to);
        });
        if(!this.currentmenu.length) {
            this.currentmenu = [window.location.pathname + window.location.search];
        }
    }
    handleClick(e) {
        if(e.key) {
            this.$router.push(e.key);
        }
    }
    titleClick() {

    }
}
</script>

<style scoped lang="scss">
    .aside-menu {
        width: 200px;
        float: left;
        height: calc(100vh - 65px);
    }
</style>