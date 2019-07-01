<template>
    <div class="page-404">
        <div class="page-body">
            <div class="page-img"></div>
            <div class="page-content">
                <h1>404</h1>
                <p>抱歉，你访问的页面不存在</p>
                <a-button type="primary" @click="$router.go(-1)" class="">返回上一页</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// export function add(a, b) {
//     let count = 0;
//     while (count < b) {
//         a += count;
//         count++;
//     }
//     return a;
// }

@Component({
    components: {}
})
export default class About extends Vue {
    go() {
        this.$root;
    }
    async created() {
        // const loader = require("assemblyscript/lib/loader");
        // const myImports = {};
        // const myModule = await loader.instantiateStreaming(
        //     fetch("/bin/module.optimized.wasm"),
        //     myImports
        // );
        // console.time('a');
        // myModule.add(0, 10000);
        // console.timeEnd('a');
        
        // console.time('b');
        // add(0, 10000);
        // console.timeEnd('b');
    }
}
</script>

<style lang="scss">
.page-404 {
    position: relative;
    text-align: center;
    height: calc(100vh - 150px);

    .page-body {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);

        .page-img {
            display: inline-block;
            vertical-align: middle;
            background-image: url(/img/404.svg);
            width: 100%;
            max-width: 430px;
            height: 360px;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: contain;
        }

        .page-content {
            display: inline-block;
            vertical-align: middle;
            margin-left: 6%;
            text-align: left;

            > h1 {
                font-size: 70px;
            }

            > p {
                color: #999;
                font-size: 20px;
                margin-top: 40px;
                margin-bottom: 30px;
            }
        }
    }
}
</style>
