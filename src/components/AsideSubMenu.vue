<template functional>
    <a-menu-item-group v-if="props.menuInfo.isGroup && (props.menuInfo.permission || []).every(i => !!props.userPermissions.includes(i))" :key="props.menuInfo.src">
        <span slot="title">
            <a-icon v-if="props.menuInfo.icon" :type="props.menuInfo.icon" />
            <span>{{ props.menuInfo.title }}
            </span>
        </span>
        <template v-for="item in props.menuInfo.children">
            <a-menu-item v-if="!item.children && (item.permission || []).every(i => !!props.userPermissions.includes(i))" :key="item.src">
                <a-icon v-if="item.icon" :type="item.icon" />
                <span>{{ item.title }}</span>
            </a-menu-item>
            <aside-sub-menu v-else-if="item.children" :key="item.src" :menu-info="item" :user-permissions="props.userPermissions" />
        </template>
    </a-menu-item-group>
    <a-sub-menu v-else-if="!props.menuInfo.isGroup && (props.menuInfo.permission || []).every(i => !!props.userPermissions.includes(i))" :key="props.menuInfo.src">
        <span slot="title">
            <a-icon v-if="props.menuInfo.icon" :type="props.menuInfo.icon" />
            <span>{{ props.menuInfo.title }}
            </span>
        </span>
        <template v-for="item in props.menuInfo.children">
            <a-menu-item v-if="!item.children && (item.permission || []).every(i => !!props.userPermissions.includes(i))" :key="item.src">
                <a-icon v-if="item.icon" :type="item.icon" />
                <span>{{ item.title }}</span>
            </a-menu-item>
            <aside-sub-menu v-else-if="item.children" :key="item.src" :menu-info="item" :user-permissions="props.userPermissions" />
        </template>
    </a-sub-menu>
</template>
<script>
export default {
    name: 'AsideSubMenu',
    props: {
        menuInfo: {
            type: Object
        },
        userPermissions: {
            type: Array
        }
    }
};
</script>