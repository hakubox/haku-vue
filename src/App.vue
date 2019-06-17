<template>
    <a-locale-provider :locale="zh_CN">
        <div id="app">
            <Front />
        </div>
    </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Component, Prop, Vue } from 'vue-property-decorator';
import Front from '@/views/Front.vue'

@Component({
  components: {
      Front
  }
})
export default class App extends Vue {
    zh_CN = zh_CN;
}
</script>

<style lang="scss" scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
