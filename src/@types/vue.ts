//公共函数库
import * as common from '@/tools/common';
import api from '@/api/index';
import { pageFilter, Breadcrumb } from "@/@types/basic";
//全局枚举
import sysEnum from '@/enum';
import { Vue } from 'vue-property-decorator';
import { Pagination } from 'ant-design-vue';

// Vue实例类型添加
declare module 'vue/types/vue' {
    // interface VueConstructor {
    // }

    /** 系统级配置 */
    interface SysConfig {
        /** 接口 */
        Interface: string,
        /** 默认用户名 */
        Default_username: string,
        /** 默认密码 */
        Default_password: string,
        /** 权限接口 */
        Permission_interface: string
    }

    interface Vue {
        /** 公共函数库 */
        $common: typeof common;
        /** 调用后台API */
        $api: typeof api;
        /** 全局枚举 */
        $emum: typeof sysEnum;
        /** EventBus */
        $bus: Vue;
        /** 系统级配置 */
        $config: SysConfig;

        
        /** [root]面包屑 */
        breadcrumbSource: Array<Breadcrumb>;
        /** [root]设置面包屑 */
        setBreadcrumb: Function;
        /** [root]主要权限 */
        is_manager: boolean;
        /** [root]获取分页器默认参数 */
        getPagination(config?: object): Pagination;
        /** [root]用户信息 */
        userInfo: object;
    }
};