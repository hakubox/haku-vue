import Vue from 'vue';
import AsideMenu from '@/components/AsideMenu.vue';
import AsideSubMenu from '@/components/AsideSubMenu.vue';
import MainHeader from '@/components/MainHeader.vue';


const components = require.context('../components/', true, /\.(vue|ts|js)$/);

const install = function():void {
    components.keys().forEach(name => {
        let componentName = name.replace(/\.\/|\.(js|ts|vue)/g, '');
        Vue.component(componentName, components(name).default);
    });
};

export default {
    install,
    ...components
};
