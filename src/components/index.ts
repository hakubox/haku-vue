import Vue from 'vue';
import AsideMenu from '@/components/AsideMenu.vue';
import AsideSubMenu from '@/components/AsideSubMenu.vue';
import MainHeader from '@/components/MainHeader.vue';

let components = {
    AsideMenu,
    AsideSubMenu,
    MainHeader
};

console.log(components);

const install = function():void {
    console.log(components);
    Object.entries(components).forEach(([name, component]) => {
        Vue.component(name, component);
    });
};

export default {
    install,
    ...components
};
