<template>
    <a-layout id="components-layout-demo-top-side-2">
        <a-layout-header class="header">
            <div class="logo">船舶物料供应系统</div>
            <div class="fr">
                <span class="txt-prop">欢迎，</span>
                <span class="txt-primary" @click="$root.roleChange()">{{$root.is_manager ? '管理员' : '操作员'}}</span>
                &nbsp;
                <a class="btn btn-primary btn-xs" @click="$root.logout()">注销</a>
            </div>
            <!-- <a-menu theme="dark" mode="horizontal" :defaultSelectedKeys="['2']" :style="{ lineHeight: '64px' }" >
                <a-menu-item key="1">nav 1</a-menu-item>
                <a-menu-item key="2">nav 2</a-menu-item>
                <a-menu-item key="3">nav 3</a-menu-item>
            </a-menu> -->

        </a-layout-header>
        <a-layout>
            <a-layout-sider width="200" style="background: #fff">
                <aside-menu />
            </a-layout-sider>
            <a-layout style="padding: 0 24px 24px;position:relative;">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item v-for="(item, index) in $root.breadcrumbSource" :key="index" :href="item.path">
                        <a-icon v-if="item.icon" :type="item.icon" /><span>{{item.title}}</span>
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <router-view />
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class UserManager extends Vue {
}
</script>

<style lang="scss">
    #components-layout-demo-top-side-2 .logo {
        width: 150px;
        height: 31px;
        // background: rgba(255,255,255,.2);
        color: white;
        margin: 16px 28px 16px 0;
        float: left;
        line-height: 32px;
    }
</style>