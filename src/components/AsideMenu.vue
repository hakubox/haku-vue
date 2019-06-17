<template>
    <a-menu v-model="currentmenu" @click="handleClick" class="aside-menu" :selectable="false" :defaultSelectedKeys="['/materiel']" :openKeys.sync="openKeys" mode="inline" >
        <a-sub-menu key="sub1" @titleClick="titleClick">
            <span slot="title"><a-icon type="appstore" /><span>数据管理</span></span>
            <a-menu-item-group key="g1">
                <template slot="title">成本管理</template>
                <a-menu-item key="/materiel">成本列表</a-menu-item>
                <!-- <a-menu-item key="/materiel?isnew=1">新增成本</a-menu-item> -->
            </a-menu-item-group>
            <a-menu-item-group key="g2">
                <template slot="title">库存管理</template>
                <a-menu-item key="/inventory">库存列表</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group key="g3">
                <template slot="title">报价信息管理</template>
                <a-menu-item key="/quotedprice">报价信息计算</a-menu-item>
            </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
            <span slot="title"><a-icon class="" type="setting" /><span>系统设置</span></span>
            <a-menu-item key="/usermanager">用户管理</a-menu-item>
            <!-- <a-menu-item key="6">Option 6</a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu> -->
        </a-sub-menu>
    </a-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component({
    components: {
    },
    watch: {
        openKeys (val) {
            // console.log('openKeys', val)
        },
    }
})
export default class MaterieIList extends Vue {
    message = 'hello word';
    openKeys = ['sub1'];
    currentmenu: Array<string> = [];

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