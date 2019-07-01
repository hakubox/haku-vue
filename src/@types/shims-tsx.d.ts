import Vue, { VNode } from 'vue';
import lodash from 'lodash';
import { namespace } from 'vuex-class';

declare global {

    const _: typeof lodash;
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }

    interface Date {
        /**
         * 日期格式化
         * @param {string} [fmt='yyyy-MM-dd'] 格式化参数
         * @returns 格式化后的字符串
         */
        format(fmt: string): string;
    }
}