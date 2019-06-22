<template>
    <div class="page-403">
        <div class="page-body">
            <div class="page-img"></div>
            <div class="page-content">
                <h1>403</h1>
                <p>抱歉，你无权访问该页面</p>
                <a-button type="primary" @click="$router.go(-1)" class="">返回上一页</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class About extends Vue {
    go() {
        this.$root;
    }
}
</script>

<style lang="scss">

.page-403 {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    text-align: center;

    .page-body {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        
        .page-img {
            display: inline-block;
            vertical-align: middle;
            background-image: url(/img/403.svg);
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
